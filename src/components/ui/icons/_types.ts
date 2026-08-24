export interface IconProps {
  className?: string;
}

export const Icons = {
  Close: "close",
  Menu: "menu",
  NextArrow: "next-arrow",
  PreviousArrow: "previous-arrow",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
