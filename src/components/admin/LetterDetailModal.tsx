"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminLetters } from "@/context/AdminLetterContext";
import LetterStatusBadge from "./LetterStatusBadge";
import LetterActions from "./LetterActions";
import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";

export default function LetterDetailModal() {
  const { detailLetter, busyId, setDetailLetter, handleAction } =
    useAdminLetters();
  const [mounted, setMounted] = useState(false);
  const busy = busyId === detailLetter?.id;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!detailLetter) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDetailLetter(null);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [detailLetter, setDetailLetter]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {detailLetter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark/80 backdrop-blur-sm px-4 sm:px-8 py-10"
          onClick={() => setDetailLetter(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[var(--bg-admin-card)] rounded-lg p-6 sm:p-8"
          >
            <button
              onClick={() => setDetailLetter(null)}
              aria-label="Close"
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors p-1"
            >
              <Icon type={Icons.Close} className="size-8 cursor-pointer" />
            </button>

            <div className="flex items-center gap-3 mb-4 pr-8 flex-wrap">
              <h3 className="font-serif text-4xl sm:text-3xl text-text-primary">
                {detailLetter.title}
              </h3>
              <LetterStatusBadge status={detailLetter.status} />
            </div>

            <p className="font-sans text-[1.15rem] text-text-muted mb-6">
              Submitted{" "}
              {new Date(detailLetter.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p className="font-serif text-2xl text-text-body leading-relaxed whitespace-pre-line mb-8">
              &ldquo;{detailLetter.message}&rdquo;
            </p>

            <div className="border-t border-gold/15 pt-5">
              <LetterActions
                status={detailLetter.status}
                busy={busy}
                onApprove={() => handleAction(detailLetter.id, "approved")}
                onDecline={() => handleAction(detailLetter.id, "declined")}
                onRevert={(to) => handleAction(detailLetter.id, to)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
