import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_STATUSES = ["pending", "approved", "declined"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("letters")
    .update({
      status: body.status,
      decided_at: new Date().toISOString(),
      decided_by: user.email,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("PATCH /api/admin/letters/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to update letter" },
      { status: 500 },
    );
  }

  const channel = admin.channel("letters-feed");
  await new Promise<void>((resolve) => {
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.send({ type: "broadcast", event: "changed", payload: {} });
        resolve();
      }
    });
  });
  admin.removeChannel(channel);

  return NextResponse.json({ success: true });
}
