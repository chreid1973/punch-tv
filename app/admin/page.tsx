import { cookies } from "next/headers";
import { decodeSession } from "@/lib/session";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin — Punch TV",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;
  const session = sessionCookie ? decodeSession(sessionCookie) : null;

  return <AdminDashboard session={session} />;
}
