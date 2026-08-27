"use client";

import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";
import {
  AdminSidebarProvider,
  useAdminSidebar,
} from "@/context/AdminSidebarContext";

export default function AdminSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSidebarProvider>
      <AdminSidebarInner>{children}</AdminSidebarInner>
    </AdminSidebarProvider>
  );
}

function AdminSidebarInner({ children }: { children: React.ReactNode }) {
  const { open, openSidebar, closeSidebar } = useAdminSidebar();

  return (
    <>
      <div className="sm:hidden flex items-start p-4 bg-[var(--bg-admin-sidebar)] border-b border-white/10">
        <button
          onClick={openSidebar}
          aria-label="Open menu"
          className="text-warm-white p-1"
        >
          <Icon type={Icons.Menu} className="size-8" />
        </button>
      </div>

      {open && (
        <div
          onClick={closeSidebar}
          className="sm:hidden fixed inset-0 bg-dark/60 z-40"
        />
      )}

      <aside
        className={`
          bg-[var(--bg-admin-sidebar)] flex flex-col shrink-0
          fixed sm:static inset-y-0 left-0 z-50
          w-72 sm:w-100
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
      >
        <button
          onClick={closeSidebar}
          aria-label="Close menu"
          className="sm:hidden self-end p-4 text-warm-white"
        >
          <Icon type={Icons.Close} className="size-8" />
        </button>

        {children}
      </aside>
    </>
  );
}
