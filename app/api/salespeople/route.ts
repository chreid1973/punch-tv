import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { decodeSession } from "@/lib/session";

// GET all salespeople (admin only)
export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("admin_session")?.value;
  const session = sessionCookie ? decodeSession(sessionCookie) : null;

  if (!session?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabaseAdmin
    .from("salespeople")
    .select("id, username, name, is_admin, created_at")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST create new salesperson (admin only)
export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get("admin_session")?.value;
  const session = sessionCookie ? decodeSession(sessionCookie) : null;

  if (!session?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { username, password, name } = await req.json();

  if (!username || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("salespeople")
    .insert([{ username: username.toLowerCase().trim(), password, name, is_admin: false }])
    .select("id, username, name, is_admin, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
