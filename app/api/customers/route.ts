import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET all customers
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST create new customer (called from order form)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, plan, addons } = body;

  const { data, error } = await supabaseAdmin
    .from("customers")
    .insert([{
      name,
      email,
      phone: phone || null,
      plan,
      addons: addons || [],
      status: "unpaid",
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
