"use client";

import { motion } from "framer-motion";

export type LettersView = "read" | "write";

interface LettersTabsProps {
  active: LettersView;
  onChange: (view: LettersView) => void;
}

const tabs: { key: LettersView; label: string }[] = [
  { key: "read", label: "Read Letters" },
  { key: "write", label: "Write A Letter" },
];

export default function LettersTabs({ active, onChange }: LettersTabsProps) {
  return (
    <div className="flex justify-center mb-10 sm:mb-14">
      <div className="relative flex items-center gap-1 p-1 rounded-full border border-gold/30 bg-surface">
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-sans text-[1.3rem] tracking-wide uppercase font-medium transition-colors duration-300 cursor-pointer ${
                isActive ? "bg-gold text-warm-white" : "text-gold"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="letters-tab-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
