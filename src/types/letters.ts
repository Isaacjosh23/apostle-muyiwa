export type LetterStatus = "pending" | "approved" | "declined";

export interface Letter {
  id: string;
  title: string;
  message: string;
  status: LetterStatus;
  createdAt: string;
}
