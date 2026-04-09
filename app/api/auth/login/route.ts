import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { encodeSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("salespeople")
    .select("id, username, name, is_admin, password")
    .eq("username", username.toLowerCase().trim())
    .single();

  if (error || !data || data.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = encodeSession({
    id: data.id,
    username: data.username,
    name: data.name,
    is_admin: data.is_admin,
  });

  const res = NextResponse.json({ success: true, is_admin: data.is_admin });
  res.cookies.set("admin_session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}
