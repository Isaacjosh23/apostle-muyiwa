import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { letterSchema } from "@/lib/validation/letterSchema";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("letters")
    .select("id, title, message, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to load letters" },
      { status: 500 },
    );
  }

  return NextResponse.json({ letters: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = letterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid letter", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.from("letters").insert({
    title: parsed.data.title,
    message: parsed.data.message,
    status: "pending",
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to submit letter" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
