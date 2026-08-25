import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data/nav";
import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";
import { useEffect, useRef } from "react";

interface MobileNavProps {
  setMenuOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

function MobileNav({ setMenuOpen, triggerRef }: MobileNavProps) {
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      const clickedInsideNav = navRef.current?.contains(target);
      const clickedTrigger = triggerRef.current?.contains(target);

      if (!clickedInsideNav && !clickedTrigger) {
        setMenuOpen(false);
      }
    }

    const timeout = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [setMenuOpen, triggerRef]);

  return (
    <motion.div
      ref={navRef}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed  top-36 left-4 right-4 sm:hidden z-950 rounded-xl overflow-hidden border border-white/10 shadow-lg"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: "rgba(43, 38, 34, 0.35)",
      }}
    >
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-linear-to-b from-white/10 to-transparent" />

      <nav className="relative flex flex-col gap-1.5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-5 py-3 font-sans text-xl font-medium tracking-wide uppercase transition-colors duration-300 ${
                isActive
                  ? "text-warm-white bg-gold"
                  : "text-warm-white hover:bg-gold-light"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <Link
          href="/letters"
          onClick={() => setMenuOpen(false)}
          className={`flex items-center justify-center gap-2 relative text-[1.4rem] text-warm-white font-sans font-medium px-8 py-3 rounded-full uppercase transition-colors duration-300 border border-gold mb-3 mx-5 ${pathname === "/letters" ? "bg-gold" : "bg-transparent"}`}
        >
          <span className="relative z-10">Leave a Note</span>

          <Icon type={Icons.Write} className="size-8" />
        </Link>
      </nav>
    </motion.div>
  );
}

export default MobileNav;
