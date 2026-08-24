"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/context/IntroContext";
import RoseSketch from "./RoseSketch";
import RoseBloom from "./RoseBloom";

export default function IntroGate() {
  const { entered, setEntered } = useIntro();

  return (
    <AnimatePresence>
      {!entered && (
        <div className="fixed inset-0 z-[2000] pointer-events-none">
          {/* Top half */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-dark flex items-end justify-center pointer-events-auto overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            {/* Primary corner rose */}
            <RoseSketch className="absolute -top-8 -left-8 w-56 sm:w-72 md:w-80 lg:w-96 text-gold opacity-[0.22] rotate-[-15deg]" />
            {/* Scattered blooms */}
            <RoseBloom className="absolute top-8 right-6 w-16 sm:w-20 md:w-28 text-gold opacity-[0.18] rotate-[20deg]" />
            <RoseBloom className="absolute top-1/3 left-1/4 w-12 sm:w-16 md:w-20 text-gold opacity-[0.15] rotate-[-30deg]" />
            <RoseBloom className="absolute top-6 right-1/3 w-24 sm:w-28 md:w-36 text-gold opacity-[0.18] rotate-[8deg]" />

            <div className="mb-4 sm:mb-6 text-center px-6 sm:px-8 md:px-4 max-w-[24rem] sm:max-w-xl relative">
              <h1 className="font-serif text-4xl sm:text-6xl leading-tight text-warm-white tracking-wide">
                Let the beautiful story begin
              </h1>
            </div>
          </motion.div>

          {/* Bottom half */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-dark flex items-start justify-center pointer-events-auto overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            {/* Primary corner rose */}
            <RoseSketch className="absolute -bottom-8 -right-8 w-56 sm:w-72 md:w-80 lg:w-96 text-gold opacity-[0.22] rotate-[165deg]" />
            {/* Scattered blooms */}
            <RoseBloom className="absolute bottom-8 left-6 w-16 sm:w-20 md:w-28 text-gold opacity-[0.18] rotate-[-20deg]" />
            <RoseBloom className="absolute bottom-1/3 right-1/4 w-12 sm:w-16 md:w-20 text-gold opacity-[0.15] rotate-[30deg]" />
            <RoseBloom className="absolute bottom-6 left-1/3 w-24 sm:w-28 md:w-36 text-gold opacity-[0.18] rotate-[-8deg]" />

            <div className="mt-4 sm:mt-6 relative">
              <button
                onClick={() => setEntered(true)}
                className="px-6 sm:px-8 py-2.5 sm:py-3 border border-gold text-gold font-sans
                           text-[1rem] font-medium sm:text-[1.2rem] tracking-[0.15em] sm:tracking-[0.2em] uppercase
                           hover:bg-gold hover:text-dark transition-colors duration-300
                           active:bg-gold active:text-dark cursor-pointer"
              >
                Begin!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
