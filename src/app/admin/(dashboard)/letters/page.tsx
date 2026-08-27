"use client";

import LetterQueueTable from "@/components/admin/LetterQueueTable";
import LetterDetailModal from "@/components/admin/LetterDetailModal";
import { Icon } from "@/components/ui/icons";
import { Icons } from "@/components/ui/icons/_types";
import {
  AdminLettersProvider,
  QueueFilter,
  useAdminLetters,
} from "@/context/AdminLetterContext";

const filters: { key: QueueFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "declined", label: "Declined" },
];

export default function AdminLettersPage() {
  return (
    <AdminLettersProvider>
      <AdminLettersPageContent />
    </AdminLettersProvider>
  );
}

function AdminLettersPageContent() {
  const {
    loading,
    activeFilter,
    searchQuery,
    setActiveFilter,
    setSearchQuery,
  } = useAdminLetters();

  return (
    <div>
      <h1 className="font-serif text-3xl text-text-primary mb-6">
        Letters Queue
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full font-sans text-[1.3rem] font-medium transition-colors cursor-pointer ${
                activeFilter === f.key
                  ? "bg-primary text-warm-white"
                  : "bg-[var(--bg-admin-card)] text-text-muted hover:text-warm-white hover:bg-primary transition-colors duration-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Icon
            type={Icons.Search}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none size-6"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or message..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gold/20 bg-[var(--bg-admin-card)] font-sans text-[1.3rem] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              <Icon type={Icons.Close} />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className="font-sans text-[1.4rem] font-medium text-text-muted py-10 text-center">
          Loading letters…
        </p>
      ) : (
        <LetterQueueTable />
      )}

      <LetterDetailModal />
    </div>
  );
}
