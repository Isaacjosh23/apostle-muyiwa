"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import LettersTabs, { LettersView } from "@/components/letters/LettersTabs";
import LetterList from "@/components/letters/LetterList";
import LetterForm from "@/components/letters/LetterForm";
import LetterModal from "@/components/letters/LetterModal";
import Toast from "@/components/ui/Toast";
import { Letter } from "@/types/letters";
import LettersSortFilter, {
  SortOrder,
} from "@/components/letters/LetterSortFilter";

export default function LettersPage() {
  const [activeView, setActiveView] = useState<LettersView>("read");
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");

  const loadLetters = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/letters");
      const data = await res.json();
      setLetters(data.letters ?? []);
    } catch {
      setLetters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLetters();
  }, []);

  const sortedLetters = useMemo(() => {
    return sortOrder === "recent" ? letters : [...letters].reverse();
  }, [letters, sortOrder]);

  const handleSubmitSuccess = () => {
    setToastMessage(
      "Your letter has been sent. Thank you for sharing your heart.",
    );
    setActiveView("read");
    loadLetters();
  };

  return (
    <main className="min-h-screen bg-parchment">
      <PageHero
        eyebrow="Words Of Honor"
        title="Letters"
        subtitle="Messages from the sons and daughters, mentees, and members from all over the globe."
      />

      <div className="pt-12 sm:pt-16">
        <LettersTabs active={activeView} onChange={setActiveView} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {activeView === "read" ? (
              <SectionWrapper>
                <div className="max-w-5xl mx-auto flex justify-end mb-6">
                  <LettersSortFilter
                    value={sortOrder}
                    onChange={setSortOrder}
                  />
                </div>
                {loading ? (
                  <p className="text-center font-sans text-[1.4rem] text-text-muted py-10">
                    Loading letters…
                  </p>
                ) : (
                  <LetterList
                    letters={sortedLetters}
                    onReadMore={setActiveLetter}
                  />
                )}
              </SectionWrapper>
            ) : (
              <SectionWrapper>
                <LetterForm onSuccess={handleSubmitSuccess} />
              </SectionWrapper>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <LetterModal
        letter={activeLetter}
        onClose={() => setActiveLetter(null)}
      />
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </main>
  );
}
