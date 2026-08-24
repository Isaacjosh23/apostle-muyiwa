"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryPhoto } from "@/lib/data/gallery";
import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";

interface LightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isOpen = activeIndex !== null;
  const photo = isOpen ? photos[activeIndex] : null;

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % photos.length);
  }, [activeIndex, photos.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + photos.length) % photos.length);
  }, [activeIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, goNext, goPrev, onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-dark/90 backdrop-blur-sm px-4 py-6 sm:px-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 sm:top-6 sm:right-6 text-warm-white/80 hover:text-warm-white transition-colors p-2"
          >
            <Icon type={Icons.Close} className="size-8" />
          </button>

          <div
            className="relative flex items-center justify-center w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Side arrows — desktop/tablet only */}
            <button
              onClick={goPrev}
              aria-label="Previous photo"
              className="hidden sm:flex absolute left-2 md:-left-4 text-warm-white/60 hover:text-warm-white transition-colors p-2 cursor-pointer"
            >
              <Icon type={Icons.PreviousArrow} />
            </button>

            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onContextMenu={(e) => e.preventDefault()}
              className="no-save relative w-full max-w-3xl max-h-[52vh] sm:max-h-[72vh] aspect-[4/5] sm:aspect-video rounded-lg overflow-hidden mx-auto"
            >
              <div
                style={{ backgroundImage: `url(${photo.src})` }}
                className="no-save absolute inset-0 bg-contain bg-center bg-no-repeat"
              />
            </motion.div>

            <button
              onClick={goNext}
              aria-label="Next photo"
              className="hidden sm:flex absolute right-2 md:-right-4 text-warm-white/60 hover:text-warm-white transition-colors p-2"
            >
              <Icon type={Icons.NextArrow} />
            </button>
          </div>

          {/* Controls row — mobile only */}
          <div
            className="flex sm:hidden items-center gap-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={goPrev}
              aria-label="Previous photo"
              className="text-warm-white/70 hover:text-warm-white transition-colors p-2 cursor-pointer"
            >
              <Icon type={Icons.PreviousArrow} className="w-6 h-6" />
            </button>

            <span className="font-sans text-[1.3rem] text-warm-white/60">
              {activeIndex + 1} / {photos.length}
            </span>

            <button
              onClick={goNext}
              aria-label="Next photo"
              className="text-warm-white/70 hover:text-warm-white transition-colors p-2 cursor-pointer"
            >
              <Icon type={Icons.NextArrow} className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
