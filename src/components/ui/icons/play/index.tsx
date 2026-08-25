import { IconProps } from "../_types";

function PlayIcon({ className }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-primary ml-1 ${className}`}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default PlayIcon;
