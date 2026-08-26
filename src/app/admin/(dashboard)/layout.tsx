import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/admin/SignOutButton";
import AdminNav from "@/components/admin/AdminNav";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg-admin-body)]">
      <AdminSidebar>
        <div className="p-6 border-b border-white/10">
          <div>
            <p className="font-sans text-[1.1rem] tracking-[0.2em] uppercase text-gold/70 mb-1">
              Admin
            </p>
            <p className="font-serif text-2xl text-warm-white">Tribute Site</p>
          </div>
        </div>

        <AdminNav />

        <div className="p-4 border-t border-white/10">
          <SignOutButton />
        </div>
      </AdminSidebar>

      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
