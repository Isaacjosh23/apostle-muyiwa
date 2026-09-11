"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./icons";
import { Icons } from "./icons/_types";

const SCROLL_THRESHOLD = 0.35;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolledRatio = docHeight > 0 ? scrollTop / docHeight : 0;
      setVisible(scrolledRatio >= SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[900] w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center shadow-lg"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            backgroundColor: "rgba(43, 38, 34, 0.5)",
          }}
        >
          <Icon type={Icons.ArrowUp} className="size-5 sm:size-6 text-gold" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
