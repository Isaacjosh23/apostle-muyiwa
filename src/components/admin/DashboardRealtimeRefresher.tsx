"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DashboardRealtimeRefresher() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("letters-feed")
      .on("broadcast", { event: "changed" }, () => {
        router.refresh();
      })
      .subscribe();

    const interval = setInterval(() => router.refresh(), 20000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [router]);

  return null;
}
