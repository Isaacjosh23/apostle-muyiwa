"use client";

import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function LetterCTA() {
  return (
    <SectionWrapper className="bg-cta py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-sans text-[1rem] sm:text-xl font-medium tracking-[0.25em] uppercase text-gold mb-3">
          Add Your Voice
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-warm-white mb-4">
          Write A Letter Of Honor
        </h2>
        <p className="font-sans text-[1.4rem] text-warm-white/70 mb-8 max-w-lg mx-auto">
          Share a memory, a lesson, or a word of appreciation for the life and
          legacy of our father.
        </p>
        <Link
          href="/letters"
          className="inline-block px-8 py-3.5 rounded-full font-sans text-[1.3rem] tracking-wide uppercase font-medium text-warm-white bg-gold hover:bg-gold-light transition-colors duration-300"
        >
          Write A Letter
        </Link>
      </div>
    </SectionWrapper>
  );
}
