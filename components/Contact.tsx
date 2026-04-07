"use client";

import { useState } from "react";

const plans = [
  "TV Only — $15/month",
  "VOD Only — $15/month",
  "Full Package — $20/month or $220/year",
  "Full Package + Adult Content Add-on",
  "Full Package + 24/7 Channels Add-on",
  "Full Package + All Add-ons",
  "Hardware (HK1 RBOX H8X Box)",
  "Just have a question",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("https://formspree.io/f/punchtv@3hpm.ca", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", phone: "", plan: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0d0d0d",
    border: "1px solid #1e1e1e",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <section id="contact" style={{ padding: "90px 24px", background: "#080808" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--punch-red)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Contact
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            Ready to punch in?
          </h2>
          <p style={{ color: "#6b7280", fontSize: "16px" }}>
            Fill out the form and we&apos;ll get back to you within the hour.
          </p>
        </div>

        {/* Form Card */}
        <div
          style={{
            background: "#111",
            border: "1px solid #1e1e1e",
            borderRadius: "20px",
            padding: "40px",
          }}
        >
          {formState === "success" ? (
            /* Success State */
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(255,10,47,0.1)",
                  border: "1px solid rgba(255,10,47,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#FF0A2F" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
                Message Sent!
              </h3>
              <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "28px" }}>
                We&apos;ll be in touch at your email shortly.
              </p>
              <button
                onClick={() => setFormState("idle")}
                style={{
                  background: "transparent",
                  border: "1px solid #1e1e1e",
                  color: "#9ca3af",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontFamily: "inherit",
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Name + Email row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                    Name <span style={{ color: "var(--punch-red)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                    Email <span style={{ color: "var(--punch-red)" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@email.com"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                  Phone <span style={{ color: "#4b5563" }}>(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (647) 000-0000"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
                />
              </div>

              {/* Plan */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                  Interested In <span style={{ color: "var(--punch-red)" }}>*</span>
                </label>
                <select
                  name="plan"
                  value={form.plan}
                  onChange={handleChange}
                  required
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
                >
                  <option value="" disabled>Select a plan...</option>
                  {plans.map((plan) => (
                    <option key={plan} value={plan} style={{ background: "#111" }}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#9ca3af", marginBottom: "8px" }}>
                  Message <span style={{ color: "#4b5563" }}>(optional)</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any questions or special requests..."
                  style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,10,47,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
                />
              </div>

              {/* Error */}
              {formState === "error" && (
                <p style={{ color: "#FF0A2F", fontSize: "13px", textAlign: "center" }}>
                  Something went wrong. Please try again or email us directly at punchtv@3hpm.ca
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === "loading"}
                style={{
                  background: formState === "loading" ? "#333" : "var(--punch-red)",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: formState === "loading" ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  if (formState !== "loading") {
                    (e.currentTarget as HTMLElement).style.background = "var(--punch-red-dark)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(255,10,47,0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    formState === "loading" ? "#333" : "var(--punch-red)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {formState === "loading" ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: "spin 1s linear infinite" }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>

              <p style={{ fontSize: "12px", color: "#4b5563", textAlign: "center" }}>
                We typically respond within the hour. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
