"use client";

import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import LettersTabs from "@/components/letters/LettersTabs";
import LetterList from "@/components/letters/LetterList";
import LetterForm from "@/components/letters/LetterForm";
import LetterModal from "@/components/letters/LetterModal";
import Toast from "@/components/ui/Toast";
import LettersSortFilter from "@/components/letters/LetterSortFilter";
import { LettersProvider, useLetters } from "@/context/LettersContext";

export default function LettersPage() {
  return (
    <LettersProvider>
      <LettersPageContent />
    </LettersProvider>
  );
}

function LettersPageContent() {
  const { activeView, loading } = useLetters();

  return (
    <main className="min-h-screen bg-parchment">
      <PageHero
        eyebrow="Words Of Honor"
        title="Letters"
        subtitle="Messages from the sons and daughters, mentees, and members from all over the globe."
      />

      <div className="py-12 sm:py-16 px-8 sm:px-0">
        <LettersTabs />

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
                  <LettersSortFilter />
                </div>
                {loading ? (
                  <p className="text-center font-sans text-[1.4rem] text-text-muted py-10">
                    Loading letters…
                  </p>
                ) : (
                  <LetterList />
                )}
              </SectionWrapper>
            ) : (
              <SectionWrapper>
                <LetterForm />
              </SectionWrapper>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <LetterModal />
      <Toast />
    </main>
  );
}
