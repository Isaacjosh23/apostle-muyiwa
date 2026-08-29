"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Letter, LetterStatus } from "@/types/letters";
import { createClient } from "@/lib/supabase/client";

export type QueueFilter = LetterStatus | "all";

interface AdminLettersContextValue {
  letters: Letter[];
  filteredLetters: Letter[];
  loading: boolean;
  activeFilter: QueueFilter;
  searchQuery: string;
  busyId: string | null;
  detailLetter: Letter | null;
  isSearching: boolean;
  setActiveFilter: (filter: QueueFilter) => void;
  setSearchQuery: (query: string) => void;
  setDetailLetter: (letter: Letter | null) => void;
  handleAction: (id: string, status: LetterStatus) => Promise<void>;
}

const AdminLettersContext = createContext<AdminLettersContextValue | undefined>(
  undefined,
);

export function AdminLettersProvider({ children }: { children: ReactNode }) {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<QueueFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [detailLetter, setDetailLetter] = useState<Letter | null>(null);

  const loadLetters = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/letters");
      const data = await res.json();
      setLetters(
        (data.letters ?? []).map(
          (l: {
            id: string;
            title: string;
            message: string;
            status: LetterStatus;
            created_at: string;
          }) => ({
            id: l.id,
            title: l.title,
            message: l.message,
            status: l.status,
            createdAt: l.created_at,
          }),
        ),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLetters();
  }, [loadLetters]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("letters-feed")
      .on("broadcast", { event: "changed" }, () => {
        loadLetters();
      })
      .subscribe();

    const interval = setInterval(loadLetters, 20000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [loadLetters]);

  const handleAction = useCallback(async (id: string, status: LetterStatus) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/letters/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLetters((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l)),
        );

        setDetailLetter((prev) =>
          prev && prev.id === id ? { ...prev, status } : prev,
        );
      }
    } finally {
      setBusyId(null);
    }
  }, []);

  const filteredLetters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      return letters.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.message.toLowerCase().includes(query),
      );
    }

    return activeFilter === "all"
      ? letters
      : letters.filter((l) => l.status === activeFilter);
  }, [letters, activeFilter, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <AdminLettersContext.Provider
      value={{
        letters,
        filteredLetters,
        loading,
        activeFilter,
        searchQuery,
        busyId,
        detailLetter,
        isSearching,
        setActiveFilter,
        setSearchQuery,
        setDetailLetter,
        handleAction,
      }}
    >
      {children}
    </AdminLettersContext.Provider>
  );
}

export function useAdminLetters() {
  const context = useContext(AdminLettersContext);
  if (!context)
    throw new Error(
      "useAdminLetters must be used within an AdminLettersProvider",
    );
  return context;
}
