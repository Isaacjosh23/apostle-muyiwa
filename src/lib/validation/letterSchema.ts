import { z } from "zod";

export const letterSchema = z.object({
  title: z.string().trim().min(3, "Give your letter a short title").max(120),
  message: z
    .string()
    .trim()
    .min(20, "Your letter feels a little short — share a bit more"),
});

export type LetterFormValues = z.infer<typeof letterSchema>;
