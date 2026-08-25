import { Letter } from "@/types/letters";
import LetterCard from "./LetterCard";

interface LetterListProps {
  letters: Letter[];
  onReadMore: (letter: Letter) => void;
}

export default function LetterList({ letters, onReadMore }: LetterListProps) {
  if (letters.length === 0) {
    return (
      <p className="text-center font-sans text-[1.4rem] text-text-muted py-10">
        No letters yet — be the first to write one.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
      {letters.map((letter, index) => (
        <LetterCard
          key={letter.id}
          letter={letter}
          index={index}
          onReadMore={onReadMore}
        />
      ))}
    </div>
  );
}
