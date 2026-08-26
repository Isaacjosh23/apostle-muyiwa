"use client";

import { useAdminSidebar } from "@/context/AdminSidebarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/letters", label: "Letters" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const { closeSidebar } = useAdminSidebar();

  return (
    <nav className="flex-1 p-4 flex flex-col gap-1">
      {adminNavLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/admin" && pathname.startsWith(`${link.href}/`));

        return (
          <Link
            onClick={closeSidebar}
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`px-4 py-2.5 rounded-md font-sans font-medium text-[1.4rem] text-warm-white/80  hover:text-warm-white transition-colors ${isActive ? "bg-gold" : "bg-transparent hover:bg-white/5"}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
