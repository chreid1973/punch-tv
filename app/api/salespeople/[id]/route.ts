import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { decodeSession } from "@/lib/session";

// PATCH update salesperson (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionCookie = req.cookies.get("admin_session")?.value;
  const session = sessionCookie ? decodeSession(sessionCookie) : null;

  if (!session?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("salespeople")
    .update(body)
    .eq("id", id)
    .select("id, username, name, is_admin, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE salesperson (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionCookie = req.cookies.get("admin_session")?.value;
  const session = sessionCookie ? decodeSession(sessionCookie) : null;

  if (!session?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("salespeople")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
