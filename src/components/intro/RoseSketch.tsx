interface RoseSketchProps {
  className?: string;
}

export default function RoseSketch({ className = "" }: RoseSketchProps) {
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stem */}
      <path
        d="M110 260C108 200 106 150 112 100"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Leaves */}
      <path
        d="M110 190C90 185 75 195 65 215C90 218 105 210 110 190Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M113 150C133 144 148 153 158 172C133 176 118 168 113 150Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Bloom — layered petal swirls */}
      <path
        d="M112 100C95 90 92 68 105 52C118 68 116 90 112 100Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M112 100C129 92 133 68 120 50C107 68 108 90 112 100Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M112 100C98 84 100 58 116 42C130 60 128 84 112 100Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M112 100C102 78 108 52 128 40C136 62 128 84 112 100Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M112 100C120 82 116 56 100 42C90 62 98 86 112 100Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Inner bud curl */}
      <path
        d="M112 100C107 92 108 82 116 76C120 84 118 94 112 100Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  );
}
