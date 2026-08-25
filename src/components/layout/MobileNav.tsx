import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data/nav";

interface MobileNavProps {
  setMenuOpen: (open: boolean) => void;
}

function MobileNav({ setMenuOpen }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-36 left-4 right-4 sm:hidden z-950 rounded-xl overflow-hidden border border-white/10 shadow-lg"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: "rgba(43, 38, 34, 0.35)",
      }}
    >
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-linear-to-b from-white/10 to-transparent" />

      <nav className="relative flex flex-col">
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
      </nav>
    </motion.div>
  );
}

export default MobileNav;
