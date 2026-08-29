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
import { Letter } from "@/types/letters";
import { LetterFormValues } from "@/lib/validation/letterSchema";
import { createClient } from "@/lib/supabase/client";

export type LettersView = "read" | "write";
export type SortOrder = "recent" | "oldest";

interface LettersContextValue {
  activeView: LettersView;
  activeLetter: Letter | null;
  letters: Letter[];
  loading: boolean;
  sortOrder: SortOrder;
  sortedLetters: Letter[];
  toastMessage: string | null;
  setActiveView: (view: LettersView) => void;
  setActiveLetter: (letter: Letter | null) => void;
  setSortOrder: (order: SortOrder) => void;
  dismissToast: () => void;
  submitLetter: (data: LetterFormValues) => Promise<boolean>;
}

const LettersContext = createContext<LettersContextValue | undefined>(
  undefined,
);

export function LettersProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<LettersView>("read");
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");

  const loadLetters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/letters");
      const data = await response.json();
      setLetters(data.letters ?? []);
    } catch {
      setLetters([]);
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

  const sortedLetters = useMemo(
    () => (sortOrder === "recent" ? letters : [...letters].reverse()),
    [letters, sortOrder],
  );

  const submitLetter = useCallback(
    async (data: LetterFormValues) => {
      const response = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) return false;

      setToastMessage(
        "Your letter has been sent. Thank you for sharing your heart.",
      );
      setActiveView("read");
      await loadLetters();
      return true;
    },
    [loadLetters],
  );

  return (
    <LettersContext.Provider
      value={{
        activeView,
        activeLetter,
        letters,
        loading,
        sortOrder,
        sortedLetters,
        toastMessage,
        setActiveView,
        setActiveLetter,
        setSortOrder,
        dismissToast: () => setToastMessage(null),
        submitLetter,
      }}
    >
      {children}
    </LettersContext.Provider>
  );
}

export function useLetters() {
  const context = useContext(LettersContext);
  if (!context)
    throw new Error("useLetters must be used within a LettersProvider");
  return context;
}
