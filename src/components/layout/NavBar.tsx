"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data/nav";
import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MobileNav from "./MobileNav";

const COMPACT_THRESHOLD = 300;

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = `${COMPACT_THRESHOLD}px`;
    sentinel.style.left = "0";
    sentinel.style.height = "1px";
    sentinel.style.width = "1px";
    sentinel.style.pointerEvents = "none";
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      document.body.removeChild(sentinel);
    };
  }, []);

  const topOffset = compact ? 14 : 0;
  const horizontalInset = compact ? 24 : 0;
  const radius = compact ? 999 : 0;
  const maxWidth = compact ? 1000 : 1400;
  const paddingX = compact ? 20 : 24;
  const paddingY = compact ? 10 : 20;

  const blurAmount = compact ? "blur(20px)" : "blur(8px)";
  const glassBg = compact ? "rgba(43, 38, 34, 0.35)" : "rgba(43, 38, 34, 0.15)";

  return (
    <>
      <motion.header
        style={{
          top: topOffset,
          left: horizontalInset,
          right: horizontalInset,
          borderRadius: radius,
          maxWidth,
          margin: "0 auto",
        }}
        className="fixed z-900 overflow-hidden isolate transition-[top,left,right,border-radius,max-width] duration-500 ease-in-out"
      >
        <motion.div
          style={{
            backdropFilter: blurAmount,
            WebkitBackdropFilter: blurAmount,
            backgroundColor: glassBg,
          }}
          className="absolute inset-0 z-0 border border-white/10 transition-colors duration-500 ease-in-out"
        />

        <div className="absolute inset-0 z-0 rounded-[inherit] pointer-events-none bg-linear-to-b from-white/10 to-transparent" />

        <motion.div
          style={{
            paddingLeft: paddingX,
            paddingRight: paddingX,
            paddingTop: paddingY,
            paddingBottom: paddingY,
          }}
          className="relative z-10 flex items-center justify-between"
        >
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
              <Image
                src="/ama-logo.png"
                alt="AMA logo"
                loading="lazy"
                width={55}
                height={55}
              />
            </div>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-8 py-3 rounded-full font-sans text-[1.4rem] tracking-wide uppercase font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-warm-white"
                      : "text-warm-white hover:bg-gold-light"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gold"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}

            <Link
              href="/letters"
              className={`flex items-center gap-2 relative text-[1.4rem] text-warm-white font-sans font-medium px-8 py-3 rounded-full uppercase transition-colors duration-300 border border-gold hover:bg-gold ${pathname === "/letters" ? "bg-gold" : "bg-transparent"}`}
            >
              {pathname === "/letters" && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gold"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10">Leave a Note</span>

              <Icon type={Icons.Write} className="size-8" />
            </Link>
          </nav>

          {/* <button
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden text-warm-white flex flex-col justify-center items-center w-16 h-16 gap-1.5 cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <Icon type={Icons.Close} className="size-10" />
            ) : (
              <Icon type={Icons.Menu} className="size-10" />
            )}
          </button> */}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden relative text-warm-white size-10"
            aria-label="Toggle menu"
          >
            <AnimatePresence initial={false} mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Icon type={Icons.Close} className="size-10" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Icon type={Icons.Menu} className="size-10" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && <MobileNav setMenuOpen={setMenuOpen} />}
      </AnimatePresence>
    </>
  );
}
