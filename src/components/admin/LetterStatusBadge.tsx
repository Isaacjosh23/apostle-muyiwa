import { LetterStatus } from "@/types/letters";

const styles: Record<LetterStatus, string> = {
  pending: "bg-gold/15 text-gold",
  approved: "bg-success/15 text-success",
  declined: "bg-attention/15 text-attention",
};

const labels: Record<LetterStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  declined: "Declined",
};

export default function LetterStatusBadge({
  status,
}: {
  status: LetterStatus;
}) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full font-sans text-[1.2rem] font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
