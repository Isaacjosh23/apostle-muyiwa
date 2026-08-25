"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";
import { SortOrder, useLetters } from "@/context/LettersContext";

const options: { key: SortOrder; label: string }[] = [
  { key: "recent", label: "Most Recent" },
  { key: "oldest", label: "Oldest First" },
];

export default function LettersSortFilter() {
  const { sortOrder: value, setSortOrder: onChange } = useLetters();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel = options.find((o) => o.key === value)?.label;

  return (
    <div ref={wrapperRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-surface font-sans text-[1.2rem] font-medium text-text-primary hover:border-gold/60 transition-colors cursor-pointer"
      >
        {activeLabel}

        <Icon
          type={Icons.ArrowDown}
          className={`transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gold/20 bg-surface shadow-card overflow-hidden z-20">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                onChange(option.key);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 font-sans font-medium text-[1.2rem] transition-colors cursor-pointer ${
                option.key === value
                  ? "bg-gold/15 text-text-primary"
                  : "text-text-body hover:bg-gold/10"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
