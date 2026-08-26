import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminDashboardPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("letters").select("status");

  const counts = { pending: 0, approved: 0, declined: 0 };
  if (data) {
    for (const row of data) {
      counts[row.status as keyof typeof counts] += 1;
    }
  }
  const total = counts.pending + counts.approved + counts.declined;

  return (
    <div>
      <h1 className="font-serif text-3xl text-text-primary font-medium mb-2">
        Dashboard
      </h1>
      <p className="font-sans text-[1.5rem] text-text-muted mb-8">
        Overview of letters submitted so far.
      </p>

      {error && (
        <p className="font-sans text-[1.3rem] text-attention mb-6">
          Failed to load stats.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total" value={total} />
        <StatCard label="Pending" value={counts.pending} accent="gold" />
        <StatCard label="Approved" value={counts.approved} accent="success" />
        <StatCard label="Declined" value={counts.declined} accent="attention" />
      </div>

      <Link
        href="/admin/letters"
        className="inline-block px-6 py-3 rounded-full font-sans text-[1.4rem] uppercase tracking-wide font-medium text-warm-white bg-primary hover:bg-primary-light transition-colors"
      >
        Go To Letters Queue
      </Link>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "gold" | "success" | "attention";
}) {
  const accentClass =
    accent === "gold"
      ? "text-gold"
      : accent === "success"
        ? "text-success"
        : accent === "attention"
          ? "text-attention"
          : "text-text-primary";

  return (
    <div className="bg-[var(--bg-admin-card)] border border-gold/15 rounded-lg p-5 h-[10rem] sm:h-60">
      <p className="font-sans text-2xl sm:text-3xl font-normal text-text-muted mb-1">
        {label}
      </p>
      <p
        className={`font-serif text-5xl sm:text-8xl flex items-center justify-center ${accentClass}`}
      >
        {value}
      </p>
    </div>
  );
}
