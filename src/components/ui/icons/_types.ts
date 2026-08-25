export interface IconProps {
  className?: string;
}

export const Icons = {
  CheckMark: "check-mark",
  Close: "close",
  Menu: "menu",
  Play: "play",
  PreviousArrow: "previous-arrow",
  NextArrow: "next-arrow",
  Write: "write",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
