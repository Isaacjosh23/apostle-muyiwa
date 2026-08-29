"use client";

import { LetterStatus } from "@/types/letters";

interface LetterActionsProps {
  status: LetterStatus;
  onApprove: () => void;
  onDecline: () => void;
  onRevert: (to: LetterStatus) => void;
  busy?: boolean;
}

export default function LetterActions({
  status,
  onApprove,
  onDecline,
  onRevert,
  busy,
}: LetterActionsProps) {
  if (status === "pending") {
    return (
      <div className="flex gap-2">
        <button
          onClick={onApprove}
          disabled={busy}
          className="px-4 py-1.5 rounded-full font-sans text-[1.3rem] font-medium text-warm-white bg-success hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          Approve
        </button>
        <button
          onClick={onDecline}
          disabled={busy}
          className="px-4 py-1.5 rounded-full font-sans text-[1.3rem] font-medium text-warm-white bg-attention hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          Decline
        </button>
      </div>
    );
  }

  const revertTo = status === "approved" ? "declined" : "approved";
  const revertLabel =
    status === "approved" ? "Decline Instead" : "Approve Instead";

  return (
    <button
      onClick={() => onRevert(revertTo)}
      disabled={busy}
      className={`px-4 py-1.5 rounded-full font-sans text-[1.3rem] font-medium border hover:text-warm-white transition-colors duration-300 disabled:opacity-50 cursor-pointer ${revertTo === "approved" ? "hover:bg-success border-success text-success" : "hover:bg-attention border-attention text-attention"}`}
    >
      {revertLabel}
    </button>
  );
}
