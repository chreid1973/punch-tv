"use client";

import { useState } from "react";
import Link from "next/link";

const PUNCH_TV_MONTHLY = 20;
const PUNCH_TV_YEARLY = 220;

const STREAMERS = [
  { key: "netflix",  label: "Netflix",   price: 18 },
  { key: "crave",    label: "Crave",     price: 20 },
  { key: "disney",   label: "Disney+",   price: 12 },
  { key: "apple",    label: "Apple TV+", price: 9  },
];

const PPV_EVENTS = [
  { key: "ufc",     label: "UFC PPV",        icon: "🥊", price: 70 },
  { key: "boxing",  label: "Boxing / WWE",   icon: "🏆", price: 60 },
];

function Counter({
  value, onChange, min = 0, max = 20,
}: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{
          width: 32, height: 32, borderRadius: "8px",
          background: "rgba(255,255,255,0.06)", border: "1px solid #2e2e2e",
          color: "#fff", fontSize: "18px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "inherit", lineHeight: 1,
        }}
      >−</button>
      <span style={{ fontSize: "20px", fontWeight: 800, color: "#fff", minWidth: "28px", textAlign: "center" }}>
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        style={{
          width: 32, height: 32, borderRadius: "8px",
          background: "rgba(255,255,255,0.06)", border: "1px solid #2e2e2e",
          color: "#fff", fontSize: "18px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "inherit", lineHeight: 1,
        }}
      >+</button>
    </div>
  );
}

export default function PriceCalculator() {
  const [ppvCounts, setPpvCounts] = useState<Record<string, number>>({ ufc: 3, boxing: 1 });
  const [cable, setCable] = useState(0);
  const [activeStreamers, setActiveStreamers] = useState<string[]>([]);
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  const toggleStreamer = (key: string) =>
    setActiveStreamers((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  // What they currently spend per year
  const ppvTotal = PPV_EVENTS.reduce((sum, e) => sum + (ppvCounts[e.key] ?? 0) * e.price, 0);
  const cableTotal = cable * 12;
  const streamerTotal = STREAMERS.filter((s) => activeStreamers.includes(s.key))
    .reduce((sum, s) => sum + s.price * 12, 0);
  const currentTotal = ppvTotal + cableTotal + streamerTotal;

  // Punch TV cost
  const punchCost = billing === "yearly" ? PUNCH_TV_YEARLY : PUNCH_TV_MONTHLY * 12;
  const savings = currentTotal - punchCost;
  const savingsPositive = savings > 0;

  const fmt = (n: number) => `$${Math.abs(n).toLocaleString()}`;

  return (
    <section id="calculator" style={{ padding: "90px 24px", background: "#080808" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--punch-red)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
            Savings Calculator
          </p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: "14px" }}>
            How much are you <span style={{ color: "var(--punch-red)" }}>overpaying?</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "520px", margin: "0 auto" }}>
            One UFC fight costs $70. Three events alone is more than a full year of Punch TV.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }} className="calc-grid">

          {/* LEFT — Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* PPV Events */}
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "24px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "18px" }}>
                PPV Events per Year
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {PPV_EVENTS.map((event) => (
                  <div key={event.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "#fff", margin: 0 }}>
                        {event.icon} {event.label}
                      </p>
                      <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>${event.price} per event</p>
                    </div>
                    <Counter
                      value={ppvCounts[event.key] ?? 0}
                      onChange={(v) => setPpvCounts((p) => ({ ...p, [event.key]: v }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Cable */}
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "24px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "18px" }}>
                Cable / Satellite Bill
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "#6b7280" }}>$</span>
                <input
                  type="number"
                  min={0}
                  max={500}
                  value={cable || ""}
                  placeholder="0"
                  onChange={(e) => setCable(Math.max(0, parseInt(e.target.value) || 0))}
                  style={{
                    width: "100px", background: "#0d0d0d", border: "1px solid #1e1e1e",
                    borderRadius: "8px", padding: "10px 14px", color: "#fff",
                    fontSize: "18px", fontWeight: 700, outline: "none", fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
                />
                <span style={{ fontSize: "14px", color: "#6b7280" }}>/month</span>
              </div>
            </div>

            {/* Streaming services */}
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "24px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "18px" }}>
                Streaming Services
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {STREAMERS.map((s) => {
                  const active = activeStreamers.includes(s.key);
                  return (
                    <button
                      key={s.key}
                      onClick={() => toggleStreamer(s.key)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 14px", borderRadius: "10px", cursor: "pointer",
                        border: `1px solid ${active ? "rgba(255,10,47,0.4)" : "#1e1e1e"}`,
                        background: active ? "rgba(255,10,47,0.06)" : "#0d0d0d",
                        transition: "all 0.2s", fontFamily: "inherit",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: "4px", flexShrink: 0,
                          background: active ? "var(--punch-red)" : "transparent",
                          border: active ? "none" : "2px solid #2e2e2e",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {active && (
                            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: active ? "#fff" : "#9ca3af" }}>
                          {s.label}
                        </span>
                      </div>
                      <span style={{ fontSize: "13px", color: active ? "var(--punch-red)" : "#4b5563", fontWeight: 700 }}>
                        ${s.price}/mo
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — Results */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "28px" }}>

              <p style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px" }}>
                Your Annual Spend
              </p>

              {/* Line items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                {PPV_EVENTS.map((e) => {
                  const count = ppvCounts[e.key] ?? 0;
                  if (!count) return null;
                  return (
                    <div key={e.key} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                      <span style={{ color: "#9ca3af" }}>{e.icon} {e.label} × {count}</span>
                      <span style={{ color: "#fff", fontWeight: 600 }}>{fmt(count * e.price)}/yr</span>
                    </div>
                  );
                })}
                {cable > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#9ca3af" }}>📺 Cable / Satellite</span>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{fmt(cable * 12)}/yr</span>
                  </div>
                )}
                {STREAMERS.filter((s) => activeStreamers.includes(s.key)).map((s) => (
                  <div key={s.key} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#9ca3af" }}>▶ {s.label}</span>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{fmt(s.price * 12)}/yr</span>
                  </div>
                ))}
                {currentTotal === 0 && (
                  <p style={{ color: "#374151", fontSize: "13px", fontStyle: "italic" }}>
                    Add items on the left to see your savings.
                  </p>
                )}
              </div>

              {currentTotal > 0 && (
                <>
                  <div style={{ borderTop: "1px solid #1e1e1e", margin: "16px 0" }} />

                  {/* Current total */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>You currently pay</span>
                    <span style={{ fontSize: "24px", fontWeight: 900, color: "#fff" }}>{fmt(currentTotal)}/yr</span>
                  </div>

                  {/* Punch TV billing toggle */}
                  <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                    {(["yearly", "monthly"] as const).map((b) => (
                      <button
                        key={b}
                        onClick={() => setBilling(b)}
                        style={{
                          flex: 1, padding: "7px", borderRadius: "8px", border: "1px solid",
                          borderColor: billing === b ? "rgba(255,10,47,0.5)" : "#1e1e1e",
                          background: billing === b ? "rgba(255,10,47,0.08)" : "transparent",
                          color: billing === b ? "#FF0A2F" : "#6b7280",
                          fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        {b === "yearly" ? "Yearly ($220)" : "Monthly ($240)"}
                      </button>
                    ))}
                  </div>

                  {/* Punch TV cost */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Punch TV costs</span>
                    <span style={{ fontSize: "24px", fontWeight: 900, color: "var(--punch-red)" }}>{fmt(punchCost)}/yr</span>
                  </div>

                  {/* Savings callout */}
                  <div style={{
                    borderRadius: "12px", padding: "20px",
                    background: savingsPositive ? "rgba(34,197,94,0.08)" : "rgba(255,10,47,0.06)",
                    border: `1px solid ${savingsPositive ? "rgba(34,197,94,0.25)" : "rgba(255,10,47,0.2)"}`,
                    textAlign: "center", marginBottom: "20px",
                  }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: savingsPositive ? "#22c55e" : "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      {savingsPositive ? "You save" : "Difference"}
                    </p>
                    <p style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-2px", color: savingsPositive ? "#22c55e" : "#FF0A2F", margin: 0 }}>
                      {savingsPositive ? "" : "-"}{fmt(savings)}/yr
                    </p>
                    {savingsPositive && (
                      <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>
                        by switching to Punch TV
                      </p>
                    )}
                  </div>
                </>
              )}

              <Link
                href={`/order?plan=${billing === "yearly" ? "full-yearly" : "full-monthly"}`}
                style={{
                  display: "block", textAlign: "center", padding: "14px",
                  borderRadius: "10px", textDecoration: "none",
                  fontSize: "15px", fontWeight: 700,
                  background: "var(--punch-red)", color: "#fff",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--punch-red-dark)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--punch-red)")}
              >
                Get Punch TV — {billing === "yearly" ? "$220/yr" : "$20/mo"} →
              </Link>
              <p style={{ fontSize: "12px", color: "#4b5563", textAlign: "center", marginTop: "10px" }}>
                No contracts. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .calc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
