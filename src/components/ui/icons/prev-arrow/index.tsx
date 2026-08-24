import { IconProps } from "../_types";

function PreviousIcon({ className }: IconProps) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export default PreviousIcon;
