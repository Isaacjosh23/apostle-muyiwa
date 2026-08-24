export interface IconProps {
  className?: string;
}

export const Icons = {
  Close: "close",
  Menu: "menu",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];
