"use client";

import { usePathname } from "next/navigation";
import IntroGate from "@/components/intro/IntroGate";
import Navbar from "./NavBar";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <IntroGate />
      <Navbar />
      {children}
    </>
  );
}
