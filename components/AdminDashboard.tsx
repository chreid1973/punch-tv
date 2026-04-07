"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Customer, Salesperson } from "@/lib/supabase";
import type { Session } from "@/lib/session";

type Filter = "all" | "paid" | "unpaid" | "expired" | "expiring";
type Tab = "customers" | "reps";

const STATUS_COLORS: Record<string, string> = {
  paid: "#22c55e",
  unpaid: "#FF0A2F",
  expired: "#f59e0b",
  cancelled: "#6b7280",
};

function isExpiringSoon(expiry: string | null) {
  if (!expiry) return false;
  const diff = (new Date(expiry).getTime() - Date.now()) / 86400000;
  return diff >= 0 && diff <= 30;
}

function isExpired(expiry: string | null) {
  if (!expiry) return false;
  return new Date(expiry) < new Date();
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
}

type SalespersonWithCount = Omit<Salesperson, "password"> & { customer_count?: number };

export default function AdminDashboard({ session }: { session: Session | null }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [salespeople, setSalespeople] = useState<SalespersonWithCount[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [repFilter, setRepFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("customers");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<{ id: string; notes: string } | null>(null);
  const [newRep, setNewRep] = useState({ name: "", username: "", password: "" });
  const [addingRep, setAddingRep] = useState(false);
  const [repError, setRepError] = useState("");
  const router = useRouter();

  const fetchCustomers = useCallback(async () => {
    const res = await fetch("/api/customers");
    if (res.ok) {
      const data = await res.json();
      setCustomers(data);
    }
    setLoading(false);
  }, []);

  const fetchSalespeople = useCallback(async () => {
    if (!session?.is_admin) return;
    const res = await fetch("/api/salespeople");
    if (res.ok) {
      const data = await res.json();
      setSalespeople(data);
    }
  }, [session?.is_admin]);

  useEffect(() => {
    fetchCustomers();
    fetchSalespeople();
  }, [fetchCustomers, fetchSalespeople]);

  const updateCustomer = async (id: string, updates: Partial<Customer>) => {
    setActionLoading(id);
    const customer = customers.find((c) => c.id === id);
    await fetch(`/api/customers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updates, plan: customer?.plan }),
    });
    await fetchCustomers();
    setActionLoading(null);
  };

  const deleteCustomer = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    setActionLoading(id);
    await fetch(`/api/customers/${id}`, { method: "DELETE" });
    await fetchCustomers();
    setActionLoading(null);
  };

  const addSalesperson = async () => {
    setRepError("");
    if (!newRep.name || !newRep.username || !newRep.password) {
      setRepError("All fields are required.");
      return;
    }
    setAddingRep(true);
    const res = await fetch("/api/salespeople", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRep),
    });
    if (res.ok) {
      setNewRep({ name: "", username: "", password: "" });
      await fetchSalespeople();
    } else {
      const err = await res.json();
      setRepError(err.error || "Failed to add rep.");
    }
    setAddingRep(false);
  };

  const deleteSalesperson = async (id: string, name: string) => {
    if (!confirm(`Remove ${name}? Their customers will remain but won't be assigned.`)) return;
    await fetch(`/api/salespeople/${id}`, { method: "DELETE" });
    await fetchSalespeople();
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Stats
  const total = customers.length;
  const paid = customers.filter((c) => c.status === "paid").length;
  const unpaid = customers.filter((c) => c.status === "unpaid").length;
  const expiringSoon = customers.filter((c) => c.status === "paid" && isExpiringSoon(c.expiry_date)).length;

  // Customer counts per rep
  const salespeopleWithCounts = salespeople.map((rep) => ({
    ...rep,
    customer_count: customers.filter((c) => c.salesperson_id === rep.id).length,
  }));

  // Filter + search + rep filter
  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchRep = repFilter === "all" || c.salesperson_id === repFilter || (repFilter === "unassigned" && !c.salesperson_id);
    if (!matchSearch || !matchRep) return false;
    if (filter === "paid") return c.status === "paid";
    if (filter === "unpaid") return c.status === "unpaid";
    if (filter === "expired") return c.status === "paid" && isExpired(c.expiry_date);
    if (filter === "expiring") return c.status === "paid" && isExpiringSoon(c.expiry_date);
    return true;
  });

  const statCards = [
    { label: "Total", value: total, color: "#fff" },
    { label: "Paid", value: paid, color: "#22c55e" },
    { label: "Unpaid", value: unpaid, color: "#FF0A2F" },
    { label: "Expiring Soon", value: expiringSoon, color: "#f59e0b" },
  ];

  const filterTabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "paid", label: "Paid" },
    { key: "unpaid", label: "Unpaid" },
    { key: "expiring", label: "Expiring Soon" },
    { key: "expired", label: "Expired" },
  ];

  const inputStyle: React.CSSProperties = {
    background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: "8px",
    padding: "10px 14px", color: "#fff", fontSize: "13px", outline: "none",
    fontFamily: "inherit", width: "100%",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#080808", padding: "24px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: "2px" }}>
              PUNCH <span style={{ color: "#FF0A2F" }}>TV</span>
            </h1>
            <p style={{ color: "#6b7280", fontSize: "13px" }}>
              {session?.is_admin ? "Admin Dashboard" : `Welcome, ${session?.name ?? "Rep"}`}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {session?.is_admin && (
              <div style={{ display: "flex", background: "#111", border: "1px solid #1e1e1e", borderRadius: "10px", overflow: "hidden" }}>
                {(["customers", "reps"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: "8px 18px", border: "none", cursor: "pointer",
                      fontFamily: "inherit", fontSize: "13px", fontWeight: 600,
                      background: tab === t ? "#FF0A2F" : "transparent",
                      color: tab === t ? "#fff" : "#6b7280",
                      transition: "all 0.2s",
                    }}
                  >
                    {t === "customers" ? "Customers" : "Manage Reps"}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={logout}
              style={{
                background: "transparent", border: "1px solid #1e1e1e", color: "#6b7280",
                padding: "8px 18px", borderRadius: "8px", cursor: "pointer",
                fontSize: "13px", fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#FF0A2F"; (e.currentTarget as HTMLElement).style.color = "#FF0A2F"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1e1e1e"; (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "24px" }}>
          {statCards.map((s) => (
            <div key={s.label} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "18px 22px" }}>
              <p style={{ fontSize: "11px", color: "#6b7280", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</p>
              <p style={{ fontSize: "34px", fontWeight: 900, color: s.color, letterSpacing: "-1px" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── CUSTOMERS TAB ── */}
        {tab === "customers" && (
          <>
            {/* Filters row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                {filterTabs.map((ft) => (
                  <button
                    key={ft.key}
                    onClick={() => setFilter(ft.key)}
                    style={{
                      padding: "6px 14px", borderRadius: "7px", border: "1px solid",
                      borderColor: filter === ft.key ? "#FF0A2F" : "#1e1e1e",
                      background: filter === ft.key ? "rgba(255,10,47,0.1)" : "transparent",
                      color: filter === ft.key ? "#FF0A2F" : "#6b7280",
                      fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    {ft.label}
                  </button>
                ))}

                {/* Rep filter — admin only */}
                {session?.is_admin && (
                  <select
                    value={repFilter}
                    onChange={(e) => setRepFilter(e.target.value)}
                    style={{
                      background: "#111", border: "1px solid #1e1e1e", borderRadius: "7px",
                      padding: "6px 12px", color: "#9ca3af", fontSize: "12px",
                      fontFamily: "inherit", outline: "none", cursor: "pointer",
                    }}
                  >
                    <option value="all">All Reps</option>
                    <option value="unassigned">Unassigned</option>
                    {salespeople.map((rep) => (
                      <option key={rep.id} value={rep.id}>{rep.name}</option>
                    ))}
                  </select>
                )}
              </div>

              <input
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "#111", border: "1px solid #1e1e1e", borderRadius: "8px",
                  padding: "7px 13px", color: "#fff", fontSize: "13px", outline: "none",
                  fontFamily: "inherit", width: "210px",
                }}
              />
            </div>

            {/* Table */}
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", overflow: "hidden" }}>
              {loading ? (
                <p style={{ color: "#6b7280", padding: "40px", textAlign: "center" }}>Loading...</p>
              ) : filtered.length === 0 ? (
                <p style={{ color: "#6b7280", padding: "40px", textAlign: "center" }}>No customers found.</p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                        {[
                          "Customer", "Plan", "Add-ons",
                          ...(session?.is_admin ? ["Rep"] : []),
                          "Status", "Start", "Expiry", "Actions"
                        ].map((h) => (
                          <th key={h} style={{
                            padding: "13px 15px", textAlign: "left", fontSize: "11px",
                            fontWeight: 700, color: "#6b7280", textTransform: "uppercase",
                            letterSpacing: "1px", whiteSpace: "nowrap",
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((c) => {
                        const expiring = c.status === "paid" && isExpiringSoon(c.expiry_date);
                        const expired = c.status === "paid" && isExpired(c.expiry_date);
                        return (
                          <tr
                            key={c.id}
                            style={{
                              borderBottom: "1px solid #1a1a1a",
                              background: "transparent", transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#161616")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                          >
                            {/* Customer */}
                            <td style={{ padding: "13px 15px" }}>
                              <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff", margin: 0 }}>{c.name}</p>
                              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{c.email}</p>
                              {c.phone && <p style={{ fontSize: "11px", color: "#4b5563", margin: 0 }}>{c.phone}</p>}
                            </td>

                            {/* Plan */}
                            <td style={{ padding: "13px 15px" }}>
                              <span style={{ fontSize: "12px", fontWeight: 600, color: "#d1d5db", background: "#1a1a1a", padding: "3px 9px", borderRadius: "6px", whiteSpace: "nowrap" }}>
                                {c.plan}
                              </span>
                            </td>

                            {/* Add-ons */}
                            <td style={{ padding: "13px 15px" }}>
                              {c.addons?.length > 0 ? (
                                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                                  {c.addons.map((a) => (
                                    <span key={a} style={{ fontSize: "11px", background: "rgba(255,10,47,0.1)", color: "#FF0A2F", padding: "2px 7px", borderRadius: "4px", whiteSpace: "nowrap" }}>
                                      {a}
                                    </span>
                                  ))}
                                </div>
                              ) : <span style={{ color: "#4b5563", fontSize: "13px" }}>—</span>}
                            </td>

                            {/* Rep column — admin only */}
                            {session?.is_admin && (
                              <td style={{ padding: "13px 15px" }}>
                                {c.salesperson_name ? (
                                  <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 600 }}>{c.salesperson_name}</span>
                                ) : (
                                  <span style={{ fontSize: "12px", color: "#374151" }}>Unassigned</span>
                                )}
                              </td>
                            )}

                            {/* Status */}
                            <td style={{ padding: "13px 15px" }}>
                              <span style={{
                                display: "inline-flex", alignItems: "center", gap: "5px",
                                fontSize: "12px", fontWeight: 700,
                                color: expired ? "#f59e0b" : STATUS_COLORS[c.status] ?? "#6b7280",
                              }}>
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: expired ? "#f59e0b" : STATUS_COLORS[c.status] ?? "#6b7280", display: "inline-block" }} />
                                {expired ? "Expired" : c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                                {expiring && !expired && " ⚠️"}
                              </span>
                            </td>

                            {/* Start */}
                            <td style={{ padding: "13px 15px", fontSize: "13px", color: "#9ca3af", whiteSpace: "nowrap" }}>
                              {formatDate(c.start_date)}
                            </td>

                            {/* Expiry */}
                            <td style={{ padding: "13px 15px", whiteSpace: "nowrap" }}>
                              <span style={{ fontSize: "13px", color: expired || expiring ? "#f59e0b" : "#9ca3af", fontWeight: expired || expiring ? 700 : 400 }}>
                                {formatDate(c.expiry_date)}
                              </span>
                            </td>

                            {/* Actions */}
                            <td style={{ padding: "13px 15px" }}>
                              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                {c.status !== "paid" && (
                                  <button
                                    onClick={() => updateCustomer(c.id, { status: "paid" })}
                                    disabled={actionLoading === c.id}
                                    style={{ background: "#22c55e", color: "#fff", border: "none", padding: "5px 11px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: actionLoading === c.id ? 0.5 : 1, whiteSpace: "nowrap" }}
                                  >
                                    ✓ Paid
                                  </button>
                                )}
                                {c.status === "paid" && (
                                  <button
                                    onClick={() => updateCustomer(c.id, { status: "unpaid" })}
                                    disabled={actionLoading === c.id}
                                    style={{ background: "transparent", color: "#f59e0b", border: "1px solid #f59e0b", padding: "5px 11px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: actionLoading === c.id ? 0.5 : 1, whiteSpace: "nowrap" }}
                                  >
                                    Unpaid
                                  </button>
                                )}
                                <button
                                  onClick={() => setEditNotes({ id: c.id, notes: c.notes ?? "" })}
                                  style={{ background: "transparent", color: "#6b7280", border: "1px solid #1e1e1e", padding: "5px 11px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                                >
                                  Notes
                                </button>
                                <button
                                  onClick={() => deleteCustomer(c.id, c.name)}
                                  disabled={actionLoading === c.id}
                                  style={{ background: "transparent", color: "#FF0A2F", border: "1px solid rgba(255,10,47,0.3)", padding: "5px 11px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: actionLoading === c.id ? 0.5 : 1 }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <p style={{ color: "#4b5563", fontSize: "12px", marginTop: "12px", textAlign: "center" }}>
              {filtered.length} customer{filtered.length !== 1 ? "s" : ""} shown
            </p>
          </>
        )}

        {/* ── MANAGE REPS TAB (admin only) ── */}
        {tab === "reps" && session?.is_admin && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Add new rep */}
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "28px" }}>
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: "20px" }}>Add New Rep</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "12px", alignItems: "end" }} className="add-rep-grid">
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "6px" }}>Full Name</label>
                  <input value={newRep.name} onChange={(e) => setNewRep({ ...newRep, name: e.target.value })} placeholder="Jane Smith" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "6px" }}>Username</label>
                  <input value={newRep.username} onChange={(e) => setNewRep({ ...newRep, username: e.target.value })} placeholder="jane" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "6px" }}>Password</label>
                  <input type="password" value={newRep.password} onChange={(e) => setNewRep({ ...newRep, password: e.target.value })} placeholder="••••••••" style={inputStyle} />
                </div>
                <button
                  onClick={addSalesperson}
                  disabled={addingRep}
                  style={{ background: "#FF0A2F", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", opacity: addingRep ? 0.6 : 1 }}
                >
                  {addingRep ? "Adding..." : "+ Add Rep"}
                </button>
              </div>
              {repError && <p style={{ color: "#FF0A2F", fontSize: "13px", marginTop: "10px" }}>{repError}</p>}
            </div>

            {/* Reps list */}
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                    {["Name", "Username", "Order Link", "Customers", "Role", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {salespeopleWithCounts.map((rep) => (
                    <tr key={rep.id} style={{ borderBottom: "1px solid #1a1a1a" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#161616")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                    >
                      <td style={{ padding: "13px 16px", fontSize: "14px", fontWeight: 600, color: "#fff" }}>{rep.name}</td>
                      <td style={{ padding: "13px 16px", fontSize: "13px", color: "#9ca3af" }}>{rep.username}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <code style={{ fontSize: "12px", color: "#6b7280", background: "#0d0d0d", padding: "3px 8px", borderRadius: "5px" }}>
                          /order?rep={rep.username}
                        </code>
                      </td>
                      <td style={{ padding: "13px 16px", fontSize: "14px", fontWeight: 700, color: "#fff" }}>{rep.customer_count ?? 0}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: rep.is_admin ? "#FF0A2F" : "#6b7280", background: rep.is_admin ? "rgba(255,10,47,0.1)" : "#1a1a1a", padding: "3px 9px", borderRadius: "5px" }}>
                          {rep.is_admin ? "Admin" : "Rep"}
                        </span>
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        {!rep.is_admin && (
                          <button
                            onClick={() => deleteSalesperson(rep.id, rep.name)}
                            style={{ background: "transparent", color: "#FF0A2F", border: "1px solid rgba(255,10,47,0.3)", padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {salespeopleWithCounts.length === 0 && (
                <p style={{ color: "#6b7280", padding: "32px", textAlign: "center" }}>No reps yet. Add one above.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Notes Modal */}
      {editNotes && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px" }}>
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "440px" }}>
            <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: "16px", fontSize: "18px" }}>Edit Notes</h3>
            <textarea
              value={editNotes.notes}
              onChange={(e) => setEditNotes({ ...editNotes, notes: e.target.value })}
              rows={5}
              placeholder="Add notes about this customer..."
              style={{ width: "100%", background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: "10px", padding: "12px 14px", color: "#fff", fontSize: "14px", outline: "none", resize: "vertical", fontFamily: "inherit" }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button
                onClick={async () => { await updateCustomer(editNotes.id, { notes: editNotes.notes } as Partial<Customer>); setEditNotes(null); }}
                style={{ flex: 1, background: "#FF0A2F", color: "#fff", border: "none", padding: "11px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >
                Save
              </button>
              <button
                onClick={() => setEditNotes(null)}
                style={{ flex: 1, background: "transparent", color: "#6b7280", border: "1px solid #1e1e1e", padding: "11px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .add-rep-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
