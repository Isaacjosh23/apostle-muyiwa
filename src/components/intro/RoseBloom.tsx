interface RoseBloomProps {
  className?: string;
}

export default function RoseBloom({ className = "" }: RoseBloomProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M60 60C43 50 40 28 53 12C66 28 64 50 60 60Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M60 60C77 52 81 28 68 10C55 28 56 50 60 60Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M60 60C46 44 48 18 64 2C78 20 76 44 60 60Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M60 60C50 38 56 12 76 0C84 22 76 44 60 60Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M60 60C68 42 64 16 48 2C38 22 46 46 60 60Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M60 60C55 52 56 42 64 36C68 44 66 54 60 60Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  );
}
