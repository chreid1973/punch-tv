import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// PATCH update customer
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  // If marking as paid, auto-calculate dates
  if (body.status === "paid" && !body.start_date) {
    const today = new Date();
    body.start_date = today.toISOString().split("T")[0];

    // Calculate expiry based on plan
    const expiry = new Date(today);
    if (body.plan?.includes("yearly") || body.plan?.includes("year")) {
      expiry.setFullYear(expiry.getFullYear() + 1);
    } else {
      expiry.setMonth(expiry.getMonth() + 1);
    }
    body.expiry_date = expiry.toISOString().split("T")[0];
  }

  body.updated_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("customers")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE customer
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
