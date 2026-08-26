"use client";

import { Letter } from "@/types/letters";
import { motion } from "framer-motion";
import { useLetters } from "@/context/LettersContext";

const TRUNCATE_LENGTH = 220;

interface LetterCardProps {
  letter: Letter;
  index?: number;
}

export default function LetterCard({ letter, index = 0 }: LetterCardProps) {
  const { setActiveLetter } = useLetters();
  const isLong = letter.message.length > TRUNCATE_LENGTH;
  const preview = isLong
    ? `${letter.message.slice(0, TRUNCATE_LENGTH).trim()}…`
    : letter.message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="bg-surface border border-gold/20 rounded-lg p-6 sm:p-7 flex flex-col"
    >
      <h3 className="font-serif text-2xl sm:text-2xl text-primary font-medium mb-3">
        {letter.title}
      </h3>
      <p className="font-serif text-xl text-body leading-relaxed">
        &ldquo;{preview}&rdquo;
      </p>
      {isLong && (
        <button
          onClick={() => setActiveLetter(letter)}
          className="mt-4 self-start font-sans text-[1.2rem] uppercase underline cursor-pointer hover:no-underline tracking-wide text-primary hover:text-primary-light transition-colors"
        >
          Read more
        </button>
      )}
    </motion.div>
  );
}
