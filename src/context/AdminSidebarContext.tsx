"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface AdminSidebarContextValue {
  open: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextValue | undefined>(
  undefined,
);

export function AdminSidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AdminSidebarContext.Provider
      value={{
        open,
        openSidebar: () => setOpen(true),
        closeSidebar: () => setOpen(false),
        toggleSidebar: () => setOpen((v) => !v),
      }}
    >
      {children}
    </AdminSidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext);
  if (!context)
    throw new Error(
      "useAdminSidebar must be used within an AdminSidebarProvider",
    );
  return context;
}
