"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full px-4 py-2.5 rounded-md font-sans text-[1.3rem] text-warm-white/60 hover:text-warm-white hover:bg-white/5 transition-colors text-left"
    >
      Sign Out
    </button>
  );
}
