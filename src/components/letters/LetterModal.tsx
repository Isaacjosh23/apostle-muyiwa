"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";
import { useLetters } from "@/context/LettersContext";

export default function LetterModal() {
  const { activeLetter: letter, setActiveLetter } = useLetters();
  const onClose = () => setActiveLetter(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!letter) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [letter, onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {letter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-dark/80 backdrop-blur-sm px-4 sm:px-8 py-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[80vh] overflow-y-auto bg-surface rounded-lg p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-muted hover:text-text-primary transition-colors p-1"
            >
              <Icon type={Icons.Close} className="size-8" />
            </button>

            <h3 className="font-serif font-medium text-2xl sm:text-3xl text-primary mb-5 pr-8">
              {letter.title}
            </h3>
            <p className="font-serif text-xl text-body leading-relaxed whitespace-pre-line">
              &ldquo;{letter.message}&rdquo;
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
