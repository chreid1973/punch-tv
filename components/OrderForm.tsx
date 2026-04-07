"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const PLANS: Record<string, {
  name: string;
  price: string;
  period: string;
  features: string[];
}> = {
  "tv-only": {
    name: "TV Only",
    price: "$15",
    period: "/month",
    features: ["5,000+ Live Channels", "HD & 4K Streams", "Sports, News & Entertainment", "Works on all devices"],
  },
  "vod-only": {
    name: "VOD Only",
    price: "$15",
    period: "/month",
    features: ["Full Movie Library", "Complete TV Series", "HD Quality", "Works on all devices"],
  },
  "full-monthly": {
    name: "Full Package",
    price: "$20",
    period: "/month",
    features: ["Everything in TV Only", "Full VOD Movie Library", "Latest TV Series", "Priority support"],
  },
  "full-yearly": {
    name: "Full Package",
    price: "$220",
    period: "/year",
    features: ["Everything in TV Only", "Full VOD Movie Library", "Latest TV Series", "1 month FREE vs monthly"],
  },
  "addon-adult": {
    name: "Adult Content Add-on",
    price: "$25",
    period: "/year",
    features: ["Premium adult channels", "Adds to any existing plan", "Billed annually"],
  },
  "addon-247": {
    name: "24/7 Channels Add-on",
    price: "$25",
    period: "/year",
    features: ["Round-the-clock specialty channels", "Adds to any existing plan", "Billed annually"],
  },
  "hardware": {
    name: "HK1 RBOX H8X Box",
    price: "$150–$200",
    period: " (one-time)",
    features: ["Android 14 OS", "Allwinner H728 Chip", "8K UHD Support", "Dual Band WiFi", "Price based on availability"],
  },
};

type FormState = "idle" | "loading" | "success" | "error";

export default function OrderForm() {
  const searchParams = useSearchParams();
  const planKey = searchParams.get("plan") || "full-monthly";
  const plan = PLANS[planKey] ?? PLANS["full-monthly"];

  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("https://formspree.io/f/xkopyrbw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          plan: `${plan.name} — ${plan.price}${plan.period}`,
          _subject: `New Order: ${plan.name} from ${form.name}`,
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

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Back link */}
      <Link
        href="/#pricing"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "#6b7280",
          textDecoration: "none",
          fontSize: "14px",
          marginBottom: "36px",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b7280")}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back to Plans
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px", alignItems: "start" }} className="order-grid">

        {/* Left — Form */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "20px", padding: "40px" }}>

          {formState === "success" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{
                width: "68px", height: "68px", borderRadius: "50%",
                background: "rgba(255,10,47,0.1)", border: "1px solid rgba(255,10,47,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
              }}>
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="#FF0A2F" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
                Order Received!
              </h2>
              <p style={{ color: "#9ca3af", fontSize: "15px", lineHeight: 1.7, marginBottom: "8px" }}>
                Thanks! We&apos;ll email you Interac payment instructions within the hour.
              </p>
              <p style={{ color: "#9ca3af", fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>
                Once payment is received your service will be activated.
              </p>
              <div style={{
                background: "#0d0d0d", border: "1px solid #1e1e1e",
                borderRadius: "12px", padding: "20px", marginBottom: "28px", textAlign: "left",
              }}>
                <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>Interac payment goes to:</p>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>punchtv@3hpm.ca</p>
              </div>
              <Link
                href="/"
                style={{
                  display: "inline-block", background: "var(--punch-red)", color: "#fff",
                  padding: "12px 28px", borderRadius: "10px", textDecoration: "none",
                  fontSize: "15px", fontWeight: 700,
                }}
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#fff", marginBottom: "6px", letterSpacing: "-0.5px" }}>
                Complete Your Order
              </h1>
              <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "32px" }}>
                Fill in your details and we&apos;ll send Interac payment instructions to your email.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Name */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                    Full Name <span style={{ color: "var(--punch-red)" }}>*</span>
                  </label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    required placeholder="John Smith" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                    Email Address <span style={{ color: "var(--punch-red)" }}>*</span>
                  </label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    required placeholder="you@email.com" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                    Phone Number <span style={{ color: "var(--punch-red)" }}>*</span>
                  </label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    required placeholder="+1 (647) 000-0000" style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
                  />
                </div>

                {/* Selected Plan (read-only) */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                    Selected Plan
                  </label>
                  <div style={{
                    ...inputStyle,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    borderColor: "rgba(255,10,47,0.2)", cursor: "default",
                  }}>
                    <span>{plan.name}</span>
                    <span style={{ color: "var(--punch-red)", fontWeight: 700 }}>
                      {plan.price}{plan.period}
                    </span>
                  </div>
                  <Link href="/#pricing" style={{ fontSize: "12px", color: "#6b7280", textDecoration: "none", marginTop: "6px", display: "inline-block" }}>
                    ← Change plan
                  </Link>
                </div>

                {formState === "error" && (
                  <p style={{ color: "#FF0A2F", fontSize: "13px" }}>
                    Something went wrong. Please try again or email punchtv@3hpm.ca directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  style={{
                    background: formState === "loading" ? "#333" : "var(--punch-red)",
                    color: "#fff", padding: "15px", borderRadius: "10px", border: "none",
                    fontSize: "16px", fontWeight: 700, cursor: formState === "loading" ? "not-allowed" : "pointer",
                    transition: "all 0.2s", fontFamily: "inherit",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}
                >
                  {formState === "loading" ? "Submitting..." : "Submit Order"}
                </button>

                <p style={{ fontSize: "12px", color: "#4b5563", textAlign: "center" }}>
                  No payment taken here. We&apos;ll email you Interac instructions within the hour.
                </p>
              </form>
            </>
          )}
        </div>

        {/* Right — Order Summary */}
        <div style={{ position: "sticky", top: "90px" }}>
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "20px", padding: "32px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px" }}>
              Order Summary
            </p>

            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
              {plan.name}
            </h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "24px" }}>
              <span style={{ fontSize: "36px", fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>
                {plan.price}
              </span>
              <span style={{ color: "#6b7280", fontSize: "14px" }}>{plan.period}</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, marginBottom: "28px" }}>
              {plan.features.map((f) => (
                <li key={f} style={{ display: "flex", gap: "10px", fontSize: "13px", color: "#9ca3af", marginBottom: "10px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="#FF0A2F" style={{ flexShrink: 0, marginTop: "1px" }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "20px" }}>
              <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px", fontWeight: 600 }}>
                How payment works:
              </p>
              <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.6 }}>
                After submitting, we&apos;ll email you Interac e-Transfer instructions. Send payment to{" "}
                <span style={{ color: "#9ca3af", fontWeight: 600 }}>punchtv@3hpm.ca</span> and your service will be activated promptly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .order-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
