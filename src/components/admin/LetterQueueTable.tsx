"use client";

import { useAdminLetters } from "@/context/AdminLetterContext";
import LetterStatusBadge from "./LetterStatusBadge";
import LetterActions from "./LetterActions";

export default function LetterQueueTable() {
  const {
    filteredLetters,
    busyId,
    setDetailLetter,
    handleAction,
    searchQuery,
  } = useAdminLetters();

  const isSearching = searchQuery.trim().length > 0;

  if (filteredLetters.length === 0) {
    return (
      <p className="font-sans text-[1.4rem] text-text-muted py-10 text-center">
        {isSearching
          ? "No letters match your search."
          : "No letters in this view."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {filteredLetters.map((letter) => (
        <div
          key={letter.id}
          onClick={() => setDetailLetter(letter)}
          className="bg-[var(--bg-admin-card)] border border-gold/15 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:border-gold/30 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-7 flex-wrap">
              <h3 className="font-serif text-3xl text-text-primary">
                {letter.title}
              </h3>
              <LetterStatusBadge status={letter.status} />
            </div>
            <p className="font-sans text-xl text-text-muted mb-7 line-clamp-2">
              {letter.message}
            </p>
            <p className="font-sans text-[1.1rem] text-text-muted/70 mt-1.5">
              {new Date(letter.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <LetterActions
              status={letter.status}
              busy={busyId === letter.id}
              onApprove={() => handleAction(letter.id, "approved")}
              onDecline={() => handleAction(letter.id, "declined")}
              onRevert={(to) => handleAction(letter.id, to)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
