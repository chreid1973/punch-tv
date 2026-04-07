import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { decodeSession } from "@/lib/session";

// GET customers — admin sees all, reps see only theirs
export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("admin_session")?.value;
  const session = sessionCookie ? decodeSession(sessionCookie) : null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let query = supabaseAdmin
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (!session.is_admin) {
    query = query.eq("salesperson_id", session.id);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — create new customer (from order form or admin)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, plan, addons, rep_username } = body;

  let salesperson_id = null;
  let salesperson_username = null;
  let salesperson_name = null;

  // If order came via a rep link (?rep=username)
  if (rep_username) {
    const { data: rep } = await supabaseAdmin
      .from("salespeople")
      .select("id, username, name")
      .eq("username", rep_username.toLowerCase().trim())
      .single();

    if (rep) {
      salesperson_id = rep.id;
      salesperson_username = rep.username;
      salesperson_name = rep.name;
    }
  }

  const { data, error } = await supabaseAdmin
    .from("customers")
    .insert([{
      name,
      email,
      phone: phone || null,
      plan,
      addons: addons || [],
      status: "unpaid",
      salesperson_id,
      salesperson_username,
      salesperson_name,
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
