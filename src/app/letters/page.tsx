"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import LettersTabs, { LettersView } from "@/components/letters/LettersTabs";
import LetterList from "@/components/letters/LetterList";
import LetterForm from "@/components/letters/LetterForm";
import LetterModal from "@/components/letters/LetterModal";
import Toast from "@/components/ui/Toast";
import { approvedLetters } from "@/lib/data/letters";
import { Letter } from "@/types/letters";

export default function LettersPage() {
  const [activeView, setActiveView] = useState<LettersView>("read");
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmitSuccess = () => {
    setToastMessage(
      "Your letter has been sent. Thank you for sharing your heart.",
    );
    setActiveView("read");
  };

  return (
    <main className="min-h-screen bg-parchment">
      <PageHero
        eyebrow="Words Of Honor"
        title="Letters"
        subtitle="Messages from the sons and daughters, mentees, and members from all over the globe."
      />

      <div className="py-12 sm:py-16 px-6">
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
                <LetterList
                  letters={approvedLetters}
                  onReadMore={setActiveLetter}
                />
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
