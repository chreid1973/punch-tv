"use client";

import { useState } from "react";

const plans = [
  {
    name: "TV Only",
    monthlyPrice: 15,
    yearlyPrice: null,
    annualIfMonthly: 180,
    planKey: "tv-only",
    yearlyPlanKey: null,
    description: "All live channels, no VOD library.",
    features: [
      "5,000+ Live Channels",
      "HD & 4K Streams",
      "Sports, News & Entertainment",
      "Works on all devices",
      "Instant activation",
    ],
    highlight: false,
    badge: null,
  },
  {
    name: "Full Package",
    monthlyPrice: 20,
    yearlyPrice: 220,
    annualIfMonthly: 240,
    planKey: "full-monthly",
    yearlyPlanKey: "full-yearly",
    description: "Live TV + full VOD library. Best value.",
    features: [
      "Everything in TV Only",
      "Full VOD Movie Library",
      "Latest TV Series",
      "Save $20 with yearly plan",
      "Priority support",
    ],
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "VOD Only",
    monthlyPrice: 15,
    yearlyPrice: null,
    annualIfMonthly: 180,
    planKey: "vod-only",
    yearlyPlanKey: null,
    description: "On-demand movies and TV series only.",
    features: [
      "Full Movie Library",
      "Complete TV Series",
      "HD Quality",
      "Works on all devices",
      "Instant activation",
    ],
    highlight: false,
    badge: null,
  },
];

const addons = [
  {
    name: "Adult Content",
    yearlyPrice: 25,
    monthlyPrice: 5,
    icon: "🔞",
    desc: "Premium adult channels added to any plan.",
    planKey: "addon-adult",
  },
  {
    name: "24/7 Channels",
    yearlyPrice: 25,
    monthlyPrice: 5,
    icon: "📡",
    desc: "Round-the-clock specialty channels, always on.",
    planKey: "addon-247",
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" style={{ padding: "90px 24px", background: "#080808" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--punch-red)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
            Pricing
          </p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-1px", color: "#fff", marginBottom: "16px" }}>
            Simple, honest pricing
          </h2>
          <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "12px" }}>
            No contracts. No hidden fees. Cancel anytime.
          </p>
          <p style={{ fontSize: "13px", color: "#4b5563", marginBottom: "32px" }}>
            All prices in <strong style={{ color: "#6b7280" }}>CAD</strong> · Taxes included
          </p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", background: "#111", border: "1px solid #1e1e1e", borderRadius: "100px", padding: "6px" }}>
            <button
              onClick={() => setYearly(false)}
              style={{
                padding: "8px 20px", borderRadius: "100px", border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: 600,
                background: !yearly ? "var(--punch-red)" : "transparent",
                color: !yearly ? "#fff" : "#6b7280", transition: "all 0.2s",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              style={{
                padding: "8px 20px", borderRadius: "100px", border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px",
                background: yearly ? "var(--punch-red)" : "transparent",
                color: yearly ? "#fff" : "#6b7280", transition: "all 0.2s",
              }}
            >
              Yearly
              <span style={{ background: "rgba(255,10,47,0.15)", color: "#FF0A2F", fontSize: "11px", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>
                Save 1 Month
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "48px", alignItems: "start" }}>
          {plans.map((plan) => {
            const showYearly = yearly && plan.yearlyPrice;
            const primaryPrice = showYearly ? plan.yearlyPrice! : plan.monthlyPrice;
            const primaryPeriod = showYearly ? "/yr" : "/mo";

            // Secondary line — the "other" billing period
            const secondaryLine = showYearly
              ? `$${plan.monthlyPrice}/mo if billed monthly`
              : plan.yearlyPrice
              ? `$${plan.yearlyPrice}/yr if billed yearly`
              : `$${plan.annualIfMonthly}/yr at this rate`;

            // Savings callout
            const savingsLine = showYearly && plan.yearlyPrice
              ? `Save $${plan.annualIfMonthly - plan.yearlyPrice}/yr — 1 month FREE`
              : yearly && !plan.yearlyPrice
              ? null
              : plan.yearlyPrice
              ? `Switch to yearly & save $${plan.annualIfMonthly - plan.yearlyPrice!}/yr`
              : null;

            return (
              <div
                key={plan.name}
                className={plan.highlight ? "pulse-glow" : "card-hover"}
                style={{
                  background: plan.highlight ? "rgba(255,10,47,0.04)" : "var(--card-bg)",
                  border: plan.highlight ? "1px solid rgba(255,10,47,0.4)" : "1px solid var(--card-border)",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  position: "relative",
                  transform: plan.highlight ? "scale(1.02)" : "scale(1)",
                }}
              >
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                    background: "var(--punch-red)", color: "#fff", fontSize: "11px", fontWeight: 700,
                    padding: "4px 14px", borderRadius: "100px", letterSpacing: "0.5px",
                    textTransform: "uppercase", whiteSpace: "nowrap",
                  }}>
                    {plan.badge}
                  </div>
                )}

                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "24px" }}>
                  {plan.description}
                </p>

                {/* Pricing block */}
                <div style={{ marginBottom: "28px" }}>
                  {/* Primary price */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "48px", fontWeight: 900, color: "#fff", letterSpacing: "-2px" }}>
                      ${primaryPrice}
                    </span>
                    <span style={{ color: "#6b7280", fontSize: "15px" }}>{primaryPeriod}</span>
                  </div>

                  {/* Secondary price — other billing period */}
                  <p style={{ fontSize: "13px", color: "#4b5563", marginBottom: "4px" }}>
                    {secondaryLine}
                  </p>

                  {/* Savings callout */}
                  {savingsLine && (
                    <p style={{
                      fontSize: "12px", fontWeight: 700,
                      color: showYearly ? "#22c55e" : "#FF0A2F",
                      marginBottom: "0",
                    }}>
                      {showYearly ? "✓ " : "→ "}{savingsLine}
                    </p>
                  )}
                </div>

                <ul style={{ listStyle: "none", padding: 0, marginBottom: "28px" }}>
                  {plan.features.map((feat) => (
                    <li key={feat} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#d1d5db", marginBottom: "10px" }}>
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="var(--punch-red)" style={{ flexShrink: 0 }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href={`/order?plan=${showYearly && plan.yearlyPlanKey ? plan.yearlyPlanKey : plan.planKey}`}
                  style={{
                    display: "block", textAlign: "center", padding: "13px", borderRadius: "10px",
                    textDecoration: "none", fontSize: "15px", fontWeight: 700,
                    background: plan.highlight ? "var(--punch-red)" : "transparent",
                    color: "#fff",
                    border: plan.highlight ? "none" : "1px solid #2e2e2e",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (plan.highlight) {
                      (e.currentTarget as HTMLElement).style.background = "var(--punch-red-dark)";
                    } else {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,10,47,0.4)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,10,47,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.highlight) {
                      (e.currentTarget as HTMLElement).style.background = "var(--punch-red)";
                    } else {
                      (e.currentTarget as HTMLElement).style.borderColor = "#2e2e2e";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  Get Started
                </a>
              </div>
            );
          })}
        </div>

        {/* Add-ons */}
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "6px", textAlign: "center" }}>
            Add-Ons
          </h3>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px", textAlign: "center" }}>
            Stack on top of any plan.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", maxWidth: "680px", margin: "0 auto" }}>
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="card-hover"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "22px", display: "flex", gap: "16px", alignItems: "flex-start" }}
              >
                <span style={{ fontSize: "28px" }}>{addon.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>{addon.name}</span>
                  </div>

                  {/* Addon pricing — both periods */}
                  <div style={{ marginBottom: "8px" }}>
                    <p style={{ fontSize: "15px", fontWeight: 800, color: "var(--punch-red)", margin: "0 0 2px" }}>
                      {yearly ? `+$${addon.yearlyPrice}/yr` : `+$${addon.monthlyPrice}/mo`}
                    </p>
                    <p style={{ fontSize: "12px", color: "#4b5563", margin: 0 }}>
                      {yearly
                        ? `$${addon.monthlyPrice}/mo if billed monthly`
                        : `$${addon.yearlyPrice}/yr if billed yearly — save $${(addon.monthlyPrice * 12) - addon.yearlyPrice}/yr`}
                    </p>
                  </div>

                  <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5, marginBottom: "14px" }}>
                    {addon.desc}
                  </p>
                  <a
                    href={`/order?plan=${addon.planKey}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: "#fff", background: "var(--punch-red)", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--punch-red-dark)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--punch-red)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    Add On
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick-info chips */}
        <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
          {[
            { icon: "💳", text: "E-transfer only" },
            { icon: "⚡", text: "Instant activation (business hours)" },
            { icon: "🔄", text: "Manual renewal — no auto-billing" },
            { icon: "📧", text: "Credentials sent via email" },
            { icon: "📺", text: "1 box · 1 connection" },
            { icon: "🔒", text: "VPN recommended" },
          ].map((chip) => (
            <div
              key={chip.text}
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "#111", border: "1px solid #1e1e1e",
                borderRadius: "100px", padding: "7px 14px",
                fontSize: "13px", color: "#9ca3af",
              }}
            >
              <span>{chip.icon}</span>
              <span>{chip.text}</span>
            </div>
          ))}
        </div>

        {/* Device bandwidth note */}
        <p style={{ textAlign: "center", fontSize: "12px", color: "#4b5563", marginTop: "14px", maxWidth: "520px", margin: "14px auto 0", lineHeight: 1.6 }}>
          One box, one connection — simple as that. Two boxes in the same home share one connection unless both are streaming at the same time. Second home or different location? You&apos;ll need a second account.
        </p>
      </div>
    </section>
  );
}
