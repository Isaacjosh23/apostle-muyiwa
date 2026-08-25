"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-dark min-h-[440px] flex items-center justify-center pt-16 pb-8 sm:pt-32 sm:pb-20 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-dark via-dark-2 to-dark pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <p className="font-sans text-[1rem] sm:text-xl font-medium tracking-[0.25em] uppercase text-gold mb-3">
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl text-warm-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="font-serif italic text-lg sm:text-xl text-warm-white/70 max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
}
