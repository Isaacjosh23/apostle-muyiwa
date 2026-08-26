"use client";

import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Icons } from "../ui/icons/_types";
import { Icon } from "../ui/icons";

export default function LetterCTA() {
  return (
    <SectionWrapper className="relative bg-dark-2 py-16 sm:py-24 px-5 sm:px-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 size-56 rounded-full bg-gold/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 size-40 rounded-full bg-primary/20 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="font-sans text-[1rem] sm:text-xl font-medium tracking-[0.25em] uppercase text-gold mb-3">
            Share Your Story
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-warm-white mb-4 leading-tight">
            Write A Letter Of Honor
          </h2>
          <p className="font-sans text-[1.4rem] text-warm-white/70 mb-8 max-w-md">
            Share a memory, a lesson, or a word of appreciation for the life and
            legacy of our father in the faith. Every letter matters.
          </p>
          <Link
            href="/letters"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans text-[1.3rem] tracking-wide uppercase font-medium text-dark bg-gold hover:bg-gold-light transition-colors duration-300"
          >
            Write A Letter Now
            <Icon type={Icons.RightArrow} className="size-8" />
          </Link>
        </div>

        <div className="relative">
          <div className="relative border border-gold/30 rounded-2xl bg-warm-white/[0.03] backdrop-blur-sm px-8 py-14 sm:py-16 flex flex-col items-center text-center gap-4">
            <div className="size-16 rounded-full border border-gold/40 flex items-center justify-center">
              <Icon type={Icons.Email} className="text-gold" />
            </div>
            <h3 className="font-serif text-2xl text-gold">
              Join The Celebration
            </h3>
            <p className="font-sans text-[1.3rem] text-warm-white max-w-xs">
              Add your voice to the letters honoring his life and legacy.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
