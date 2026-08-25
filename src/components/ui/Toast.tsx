"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./icons";
import { Icons } from "./icons/_types";

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
  duration?: number;
}

export default function Toast({
  message,
  onDismiss,
  duration = 4000,
}: ToastProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -16, x: 16 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -16, x: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-5 right-5 z-[9999] max-w-xs bg-dark text-warm-white border border-gold/30 rounded-lg shadow-lg px-5 py-4 flex items-start gap-3"
        >
          <div className="mt-0.5 shrink-0 size-5 rounded-full bg-success/20 flex items-center justify-center">
            <Icon type={Icons.CheckMark} className="size-10 text-success" />
          </div>
          <p className="font-sans text-[1.3rem] text-warm-white leading-snug">
            {message}
          </p>
          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="ml-auto shrink-0 text-warm-white/60 hover:text-warm-white transition-colors"
          >
            <Icon type={Icons.Close} className="size-8" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
