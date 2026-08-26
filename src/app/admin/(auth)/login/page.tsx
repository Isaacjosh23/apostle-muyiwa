"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center px-5">
      <div className="w-full max-w-160 ">
        <div className="text-center mb-8">
          <p className="font-sans text-[1rem] font-medium tracking-[0.25em] uppercase text-gold mb-2">
            Organizer Access
          </p>
          <h1 className="font-serif text-3xl text-warm-white">Admin Login</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-dark-2 border border-gold/20 rounded-lg p-6 sm:p-8"
        >
          <div>
            <label
              htmlFor="email"
              className="block font-sans text-[1.2rem] font-medium text-warm-white/80 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gold/20 bg-warm-white/5 font-sans text-[1.4rem] text-warm-white focus:outline-none focus:border-gold transition-colors"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-sans text-[1.2rem] font-medium text-warm-white/80 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gold/20 bg-warm-white/5 font-sans text-[1.4rem] text-warm-white focus:outline-none focus:border-gold transition-colors"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="font-sans text-[1.2rem] text-attention">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-8 py-3.5 rounded-full font-sans text-[1.3rem] tracking-wide uppercase font-medium text-warm-white bg-primary hover:bg-primary-light transition-colors duration-300 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
