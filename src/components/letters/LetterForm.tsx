"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { letterSchema, LetterFormValues } from "@/lib/validation/letterSchema";

interface LetterFormProps {
  onSuccess: () => void;
}

export default function LetterForm({ onSuccess }: LetterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LetterFormValues>({
    resolver: zodResolver(letterSchema),
  });

  const onSubmit = async (data: LetterFormValues) => {
    // Placeholder — replace with POST /api/letters (status: "pending")
    // once the Supabase route handler exists (PRD §11.1). No identity
    // fields are collected or sent — letters are fully anonymous.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Letter submitted (pending):", data);
    reset();
    onSuccess();
  };

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-surface border border-gold/20 rounded-lg p-6 sm:p-8 flex flex-col gap-5"
        noValidate
      >
        <div>
          <label
            htmlFor="title"
            className="block font-sans text-[1.3rem] font-medium text-gold mb-1.5"
          >
            Letter title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full px-4 py-3 rounded-md border border-gold/30 bg-warm-white font-sans text-[1.4rem] text-text-body focus:outline-none focus:border-gold transition-colors"
            placeholder="A Father and More, My Solid Rock"
          />
          {errors.title && (
            <p className="mt-1.5 font-sans text-[1.2rem] text-attention">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-sans text-[1.3rem] font-medium text-gold mb-1.5"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows={6}
            {...register("message")}
            className="w-full px-4 py-3 rounded-md border border-gold/30 bg-warm-white font-sans text-[1.4rem] text-text-body focus:outline-none focus:border-gold transition-colors resize-none"
            placeholder="Share a memory, a lesson, or words of honor..."
          />
          {errors.message && (
            <p className="mt-1.5 font-sans text-[1.2rem] text-attention">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 px-8 py-3.5 rounded-full font-sans text-[1.3rem] tracking-wide uppercase font-medium text-warm-white bg-primary hover:bg-primary-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? "Sending..." : "Submit Letter"}
        </button>
      </form>
    </div>
  );
}
