"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Customer } from "@/lib/supabase";

type Filter = "all" | "paid" | "unpaid" | "expired" | "expiring";

const PLAN_LABELS: Record<string, string> = {
  "tv-only": "TV Only",
  "vod-only": "VOD Only",
  "full-monthly": "Full Package (Monthly)",
  "full-yearly": "Full Package (Yearly)",
  "addon-adult": "Adult Add-on",
  "addon-247": "24/7 Add-on",
};

const STATUS_COLORS: Record<string, string> = {
  paid: "#22c55e",
  unpaid: "#FF0A2F",
  expired: "#f59e0b",
  cancelled: "#6b7280",
};

function isExpiringSoon(expiry: string | null) {
  if (!expiry) return false;
  const exp = new Date(expiry);
  const today = new Date();
  const diff = (exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
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

export default function AdminDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<{ id: string; notes: string } | null>(null);
  const router = useRouter();

  const fetchCustomers = useCallback(async () => {
    const res = await fetch("/api/customers");
    const data = await res.json();
    setCustomers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

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

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Stats
  const total = customers.length;
  const paid = customers.filter((c) => c.status === "paid").length;
  const unpaid = customers.filter((c) => c.status === "unpaid").length;
  const expiringSoon = customers.filter((c) => c.status === "paid" && isExpiringSoon(c.expiry_date)).length;

  // Filter + search
  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;
    if (filter === "paid") return c.status === "paid";
    if (filter === "unpaid") return c.status === "unpaid";
    if (filter === "expired") return c.status === "paid" && isExpired(c.expiry_date);
    if (filter === "expiring") return c.status === "paid" && isExpiringSoon(c.expiry_date);
    return true;
  });

  const statCards = [
    { label: "Total Customers", value: total, color: "#fff" },
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

  return (
    <main style={{ minHeight: "100vh", background: "#080808", padding: "24px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: "4px" }}>
              PUNCH <span style={{ color: "#FF0A2F" }}>TV</span> — Admin
            </h1>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>Customer management dashboard</p>
          </div>
          <button
            onClick={logout}
            style={{
              background: "transparent", border: "1px solid #1e1e1e", color: "#6b7280",
              padding: "8px 18px", borderRadius: "8px", cursor: "pointer",
              fontSize: "13px", fontFamily: "inherit", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#FF0A2F"; (e.currentTarget as HTMLElement).style.color = "#FF0A2F"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1e1e1e"; (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" }}>
          {statCards.map((s) => (
            <div key={s.label} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "20px 24px" }}>
              <p style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</p>
              <p style={{ fontSize: "36px", fontWeight: 900, color: s.color, letterSpacing: "-1px" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                style={{
                  padding: "7px 16px", borderRadius: "8px", border: "1px solid",
                  borderColor: filter === tab.key ? "#FF0A2F" : "#1e1e1e",
                  background: filter === tab.key ? "rgba(255,10,47,0.1)" : "transparent",
                  color: filter === tab.key ? "#FF0A2F" : "#6b7280",
                  fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <input
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "#111", border: "1px solid #1e1e1e", borderRadius: "8px",
              padding: "8px 14px", color: "#fff", fontSize: "13px", outline: "none",
              fontFamily: "inherit", width: "220px",
            }}
          />
        </div>

        {/* Table */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", overflow: "hidden" }}>
          {loading ? (
            <p style={{ color: "#6b7280", padding: "40px", textAlign: "center" }}>Loading customers...</p>
          ) : filtered.length === 0 ? (
            <p style={{ color: "#6b7280", padding: "40px", textAlign: "center" }}>No customers found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
                    {["Customer", "Plan", "Add-ons", "Status", "Start", "Expiry", "Actions"].map((h) => (
                      <th key={h} style={{
                        padding: "14px 16px", textAlign: "left", fontSize: "11px",
                        fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px",
                        whiteSpace: "nowrap",
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
                          background: expiring ? "rgba(245,158,11,0.03)" : expired ? "rgba(255,10,47,0.03)" : "transparent",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#161616")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = expiring ? "rgba(245,158,11,0.03)" : expired ? "rgba(255,10,47,0.03)" : "transparent")}
                      >
                        {/* Customer */}
                        <td style={{ padding: "14px 16px" }}>
                          <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff", margin: 0 }}>{c.name}</p>
                          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{c.email}</p>
                          {c.phone && <p style={{ fontSize: "11px", color: "#4b5563", margin: 0 }}>{c.phone}</p>}
                        </td>

                        {/* Plan */}
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            fontSize: "12px", fontWeight: 600, color: "#d1d5db",
                            background: "#1a1a1a", padding: "3px 10px", borderRadius: "6px", whiteSpace: "nowrap",
                          }}>
                            {PLAN_LABELS[c.plan] ?? c.plan}
                          </span>
                        </td>

                        {/* Add-ons */}
                        <td style={{ padding: "14px 16px" }}>
                          {c.addons?.length > 0 ? (
                            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                              {c.addons.map((a) => (
                                <span key={a} style={{ fontSize: "11px", background: "rgba(255,10,47,0.1)", color: "#FF0A2F", padding: "2px 8px", borderRadius: "4px", whiteSpace: "nowrap" }}>
                                  {a === "addon-adult" ? "🔞 Adult" : "📡 24/7"}
                                </span>
                              ))}
                            </div>
                          ) : <span style={{ color: "#4b5563", fontSize: "13px" }}>—</span>}
                        </td>

                        {/* Status */}
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            fontSize: "12px", fontWeight: 700,
                            color: expired ? "#f59e0b" : STATUS_COLORS[c.status] ?? "#6b7280",
                          }}>
                            <span style={{
                              width: 7, height: 7, borderRadius: "50%",
                              background: expired ? "#f59e0b" : STATUS_COLORS[c.status] ?? "#6b7280",
                              display: "inline-block",
                            }} />
                            {expired ? "Expired" : c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                            {expiring && !expired && <span style={{ color: "#f59e0b", fontSize: "10px" }}> ⚠️</span>}
                          </span>
                        </td>

                        {/* Start */}
                        <td style={{ padding: "14px 16px", fontSize: "13px", color: "#9ca3af", whiteSpace: "nowrap" }}>
                          {formatDate(c.start_date)}
                        </td>

                        {/* Expiry */}
                        <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                          <span style={{ fontSize: "13px", color: expired ? "#f59e0b" : expiring ? "#f59e0b" : "#9ca3af", fontWeight: expired || expiring ? 700 : 400 }}>
                            {formatDate(c.expiry_date)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {c.status !== "paid" && (
                              <button
                                onClick={() => updateCustomer(c.id, { status: "paid" })}
                                disabled={actionLoading === c.id}
                                style={{
                                  background: "#22c55e", color: "#fff", border: "none",
                                  padding: "6px 12px", borderRadius: "6px", fontSize: "12px",
                                  fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                                  opacity: actionLoading === c.id ? 0.5 : 1,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                ✓ Mark Paid
                              </button>
                            )}
                            {c.status === "paid" && (
                              <button
                                onClick={() => updateCustomer(c.id, { status: "unpaid" })}
                                disabled={actionLoading === c.id}
                                style={{
                                  background: "transparent", color: "#f59e0b",
                                  border: "1px solid #f59e0b", padding: "6px 12px",
                                  borderRadius: "6px", fontSize: "12px", fontWeight: 700,
                                  cursor: "pointer", fontFamily: "inherit",
                                  opacity: actionLoading === c.id ? 0.5 : 1,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Mark Unpaid
                              </button>
                            )}
                            <button
                              onClick={() => setEditNotes({ id: c.id, notes: c.notes ?? "" })}
                              style={{
                                background: "transparent", color: "#6b7280",
                                border: "1px solid #1e1e1e", padding: "6px 12px",
                                borderRadius: "6px", fontSize: "12px", fontWeight: 600,
                                cursor: "pointer", fontFamily: "inherit",
                              }}
                            >
                              Notes
                            </button>
                            <button
                              onClick={() => deleteCustomer(c.id, c.name)}
                              disabled={actionLoading === c.id}
                              style={{
                                background: "transparent", color: "#FF0A2F",
                                border: "1px solid rgba(255,10,47,0.3)", padding: "6px 12px",
                                borderRadius: "6px", fontSize: "12px", fontWeight: 600,
                                cursor: "pointer", fontFamily: "inherit",
                                opacity: actionLoading === c.id ? 0.5 : 1,
                              }}
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

        <p style={{ color: "#4b5563", fontSize: "12px", marginTop: "16px", textAlign: "center" }}>
          {filtered.length} customer{filtered.length !== 1 ? "s" : ""} shown
        </p>
      </div>

      {/* Notes Modal */}
      {editNotes && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, padding: "24px",
        }}>
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "440px" }}>
            <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: "16px", fontSize: "18px" }}>Edit Notes</h3>
            <textarea
              value={editNotes.notes}
              onChange={(e) => setEditNotes({ ...editNotes, notes: e.target.value })}
              rows={5}
              placeholder="Add notes about this customer..."
              style={{
                width: "100%", background: "#0d0d0d", border: "1px solid #1e1e1e",
                borderRadius: "10px", padding: "12px 14px", color: "#fff",
                fontSize: "14px", outline: "none", resize: "vertical",
                fontFamily: "inherit",
              }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button
                onClick={async () => {
                  await updateCustomer(editNotes.id, { notes: editNotes.notes } as Partial<Customer>);
                  setEditNotes(null);
                }}
                style={{
                  flex: 1, background: "#FF0A2F", color: "#fff", border: "none",
                  padding: "11px", borderRadius: "8px", fontSize: "14px",
                  fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setEditNotes(null)}
                style={{
                  flex: 1, background: "transparent", color: "#6b7280",
                  border: "1px solid #1e1e1e", padding: "11px", borderRadius: "8px",
                  fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
