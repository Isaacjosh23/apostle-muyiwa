"use client";

import { motion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";
import HeroCarousel from "./HeroCarousel";
import Link from "next/link";
import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";

export default function Hero() {
  const { entered } = useIntro();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <HeroCarousel />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-sans text-[1rem] font-medium sm:text-xl tracking-[0.25em] uppercase text-gold mb-3 sm:mb-4"
        >
          In Loving Honor Of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl leading-tight text-warm-white mb-3 sm:mb-4"
        >
          Apostle Muyiwa Areo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="font-serif italic text-xl sm:text-2xl text-warm-white/80 max-w-xs sm:max-w-xl"
        >
          A father in the faith, a mentor to many, a legacy that lives on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-[1.6rem] mt-24"
        >
          <Link
            href="/gallery"
            className="text-2xl font-medium border border-warm-white text-warm-white hover:border-gold hover:text-gold transition-colors duration-300 px-12 py-4 rounded-full"
          >
            View Moments
          </Link>

          <Link
            href="/letters"
            className="flex items-center gap-2 text-2xl font-medium border border-gold text-gold hover:bg-gold hover:text-warm-white transitions-color duration-300 px-12 py-4 rounded-full"
          >
            <span>Leave a Note</span>
            <Icon type={Icons.Write} className="size-8" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
