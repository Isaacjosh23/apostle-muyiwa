"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { heroSlides } from "@/lib/data/hero";

const SLIDE_DURATION = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroSlides.map((slide, i) => (
        <motion.div
          key={slide.src ?? slide.placeholderLabel}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0 || i === 1}
            className="object-cover"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-dark/50" />

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {heroSlides.map((s, i) => (
          <button
            key={s.src ?? s.placeholderLabel}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-5 sm:w-6 bg-gold"
                : "w-1.5 sm:w-2 bg-warm-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
