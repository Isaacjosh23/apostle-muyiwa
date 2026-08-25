export interface IconProps {
  className?: string;
}

export const Icons = {
  ArrowDown: "arrow-down",
  CheckMark: "check-mark",
  Close: "close",
  Email: "email",
  Menu: "menu",
  Play: "play",
  PreviousArrow: "previous-arrow",
  NextArrow: "next-arrow",
  RightArrow: "arrow-right",
  Write: "write",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
