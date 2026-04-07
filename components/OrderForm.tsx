"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BASE_PLANS = [
  {
    key: "tv-only",
    name: "TV Only",
    price: 15,
    period: "/month",
    description: "Live channels only",
  },
  {
    key: "vod-only",
    name: "VOD Only",
    price: 15,
    period: "/month",
    description: "Movies & series on demand",
  },
  {
    key: "full-monthly",
    name: "Full Package",
    price: 20,
    period: "/month",
    description: "Live TV + VOD — best value",
    popular: true,
  },
  {
    key: "full-yearly",
    name: "Full Package",
    price: 220,
    period: "/year",
    description: "Live TV + VOD — 1 month FREE",
  },
];

const ADDONS = [
  {
    key: "addon-adult",
    name: "Adult Content",
    icon: "🔞",
    price: 25,
    period: "/year",
    description: "Premium adult channels",
  },
  {
    key: "addon-247",
    name: "24/7 Channels",
    icon: "📡",
    price: 25,
    period: "/year",
    description: "Round-the-clock specialty channels",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function OrderForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "full-monthly";

  const [selectedPlan, setSelectedPlan] = useState(
    BASE_PLANS.find((p) => p.key === initialPlan) ?? BASE_PLANS[2]
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    ADDONS.filter((a) => initialPlan === a.key).map((a) => a.key)
  );
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const toggleAddon = (key: string) => {
    setSelectedAddons((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const addonTotal = selectedAddons.length * 25;
  const basePrice = selectedPlan.price;
  const isYearly = selectedPlan.period === "/year";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    const addonNames = selectedAddons
      .map((k) => ADDONS.find((a) => a.key === k)?.name)
      .filter(Boolean)
      .join(", ");

    const orderSummary = [
      `Base Plan: ${selectedPlan.name} — $${selectedPlan.price}${selectedPlan.period}`,
      addonNames ? `Add-ons: ${addonNames} — $${addonTotal}/year` : null,
      `Total: $${basePrice}${selectedPlan.period}${addonTotal ? ` + $${addonTotal}/year add-ons` : ""}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("https://formspree.io/f/xkopyrbw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          order: orderSummary,
          _subject: `New Order: ${selectedPlan.name} from ${form.name}`,
        }),
      });

      if (res.ok) setFormState("success");
      else setFormState("error");
    } catch {
      setFormState("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0d0d0d",
    border: "1px solid #1e1e1e",
    borderRadius: "10px",
    padding: "13px 16px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  if (formState === "success") {
    return (
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          background: "rgba(255,10,47,0.1)", border: "1px solid rgba(255,10,47,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
        }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#FF0A2F" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "12px", letterSpacing: "-0.5px" }}>
          Order Received!
        </h2>
        <p style={{ color: "#9ca3af", fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>
          Thanks! We&apos;ll email you Interac payment instructions within the hour. Once payment is received your service will be activated.
        </p>
        <div style={{
          background: "#111", border: "1px solid #1e1e1e",
          borderRadius: "14px", padding: "24px", marginBottom: "32px", textAlign: "left",
        }}>
          <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
            Send Interac e-Transfer to:
          </p>
          <p style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>punchtv@3hpm.ca</p>
        </div>
        <Link href="/" style={{
          display: "inline-block", background: "var(--punch-red)", color: "#fff",
          padding: "13px 32px", borderRadius: "10px", textDecoration: "none",
          fontSize: "15px", fontWeight: 700,
        }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Back link */}
      <Link href="/#pricing" style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        color: "#6b7280", textDecoration: "none", fontSize: "14px",
        marginBottom: "36px", transition: "color 0.2s",
      }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b7280")}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back to Plans
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "28px", alignItems: "start" }} className="order-grid">

        {/* LEFT — Selections + Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Step 1 — Base Plan */}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "20px", padding: "32px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--punch-red)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>
              Step 1
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>
              Choose your base plan
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="plan-grid">
              {BASE_PLANS.map((plan) => {
                const selected = selectedPlan.key === plan.key;
                return (
                  <button
                    key={plan.key}
                    onClick={() => setSelectedPlan(plan)}
                    style={{
                      background: selected ? "rgba(255,10,47,0.08)" : "#0d0d0d",
                      border: selected ? "1px solid rgba(255,10,47,0.5)" : "1px solid #1e1e1e",
                      borderRadius: "12px",
                      padding: "16px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                      position: "relative",
                    }}
                  >
                    {plan.popular && (
                      <span style={{
                        position: "absolute", top: "-10px", left: "12px",
                        background: "var(--punch-red)", color: "#fff",
                        fontSize: "10px", fontWeight: 700, padding: "3px 10px",
                        borderRadius: "100px", letterSpacing: "0.5px", textTransform: "uppercase",
                      }}>
                        Popular
                      </span>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>{plan.name}</span>
                      {selected && (
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="#FF0A2F">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "10px" }}>{plan.description}</p>
                    <span style={{ fontSize: "20px", fontWeight: 900, color: selected ? "#FF0A2F" : "#fff", letterSpacing: "-0.5px" }}>
                      ${plan.price}
                    </span>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>{plan.period}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 — Add-ons */}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "20px", padding: "32px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--punch-red)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>
              Step 2
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>
              Add extras <span style={{ fontSize: "14px", fontWeight: 500, color: "#6b7280" }}>(optional)</span>
            </h2>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
              Stack on top of your base plan. Each add-on is $25/year.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {ADDONS.map((addon) => {
                const checked = selectedAddons.includes(addon.key);
                return (
                  <button
                    key={addon.key}
                    onClick={() => toggleAddon(addon.key)}
                    style={{
                      background: checked ? "rgba(255,10,47,0.08)" : "#0d0d0d",
                      border: checked ? "1px solid rgba(255,10,47,0.5)" : "1px solid #1e1e1e",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                  >
                    {/* Checkbox */}
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0,
                      background: checked ? "var(--punch-red)" : "transparent",
                      border: checked ? "none" : "2px solid #2e2e2e",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                    }}>
                      {checked && (
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: "22px" }}>{addon.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "#fff", margin: 0 }}>{addon.name}</p>
                      <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{addon.description}</p>
                    </div>
                    <span style={{ fontSize: "15px", fontWeight: 800, color: checked ? "#FF0A2F" : "#6b7280", whiteSpace: "nowrap" }}>
                      +$25/yr
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3 — Your Info */}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "20px", padding: "32px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--punch-red)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>
              Step 3
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>
              Your details
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                  Full Name <span style={{ color: "var(--punch-red)" }}>*</span>
                </label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  required placeholder="John Smith" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                  Email Address <span style={{ color: "var(--punch-red)" }}>*</span>
                </label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  required placeholder="you@email.com" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                  Phone Number <span style={{ color: "var(--punch-red)" }}>*</span>
                </label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  required placeholder="+1 (647) 000-0000" style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")} />
              </div>

              {formState === "error" && (
                <p style={{ color: "#FF0A2F", fontSize: "13px" }}>
                  Something went wrong. Please try again or email punchtv@3hpm.ca directly.
                </p>
              )}

              <button type="submit" disabled={formState === "loading"} style={{
                background: formState === "loading" ? "#333" : "var(--punch-red)",
                color: "#fff", padding: "15px", borderRadius: "10px", border: "none",
                fontSize: "16px", fontWeight: 700, cursor: formState === "loading" ? "not-allowed" : "pointer",
                transition: "all 0.2s", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}>
                {formState === "loading" ? "Submitting..." : "Submit Order →"}
              </button>
              <p style={{ fontSize: "12px", color: "#4b5563", textAlign: "center" }}>
                No payment taken here. We&apos;ll email you Interac instructions within the hour.
              </p>
            </form>
          </div>
        </div>

        {/* RIGHT — Live Order Summary */}
        <div style={{ position: "sticky", top: "90px" }}>
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "20px", padding: "28px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px" }}>
              Order Summary
            </p>

            {/* Base plan line */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", color: "#d1d5db", fontWeight: 600 }}>{selectedPlan.name}</span>
              <span style={{ fontSize: "14px", color: "#fff", fontWeight: 700 }}>${selectedPlan.price}{selectedPlan.period}</span>
            </div>

            {/* Add-on lines */}
            {selectedAddons.map((key) => {
              const addon = ADDONS.find((a) => a.key === key);
              if (!addon) return null;
              return (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#6b7280" }}>{addon.icon} {addon.name}</span>
                  <span style={{ fontSize: "13px", color: "#9ca3af" }}>+$25/yr</span>
                </div>
              );
            })}

            {/* Divider */}
            <div style={{ borderTop: "1px solid #1e1e1e", margin: "16px 0" }} />

            {/* Total */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
                {isYearly ? "Billed annually" : "Billed monthly"}
                {selectedAddons.length > 0 && " · Add-ons billed yearly"}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "40px", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px" }}>
                  ${selectedPlan.price}
                </span>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{selectedPlan.period}</span>
              </div>
              {selectedAddons.length > 0 && (
                <p style={{ fontSize: "13px", color: "#FF0A2F", fontWeight: 600, marginTop: "4px" }}>
                  + ${addonTotal}/year in add-ons
                </p>
              )}
            </div>

            {/* Payment info */}
            <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: "10px", padding: "16px" }}>
              <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                Pay via Interac to:
              </p>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>punchtv@3hpm.ca</p>
              <p style={{ fontSize: "11px", color: "#4b5563", marginTop: "6px" }}>
                Instructions sent after order submission
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .order-grid { grid-template-columns: 1fr !important; }
          .plan-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .plan-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
