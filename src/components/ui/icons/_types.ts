export interface IconProps {
  className?: string;
}

export const Icons = {
  ArrowDown: "arrow-down",
  ArrowUp: "arrow-up",
  CheckMark: "check-mark",
  Close: "close",
  Email: "email",
  Exit: "exit",
  EyeClose: "eye-close",
  EyeOpen: "eye-open",
  Menu: "menu",
  Play: "play",
  PreviousArrow: "previous-arrow",
  NextArrow: "next-arrow",
  RightArrow: "arrow-right",
  Search: "search",
  Write: "write",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
