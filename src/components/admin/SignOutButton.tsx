"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";

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
      className="w-full px-4 py-2.5 rounded-md font-sans text-[1.5rem] text-warm-white/60 hover:text-warm-white hover:bg-white/5 transition-colors text-left flex items-center gap-4 cursor-pointer"
    >
      <Icon type={Icons.Exit} className="size-[2.2rem]" />
      <span>Sign Out</span>
    </button>
  );
}
