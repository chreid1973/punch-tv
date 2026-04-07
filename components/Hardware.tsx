"use client";

import Image from "next/image";

export default function Hardware() {
  return (
    <section id="hardware" style={{ padding: "90px 24px", background: "#080808" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
            Hardware
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
            Need a box? We&apos;ve got you.
          </h2>
          <p style={{ color: "#6b7280", fontSize: "16px" }}>
            Plug in, connect, and start streaming. Prices vary based on availability.
          </p>
        </div>

        {/* Single Box Card */}
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto 40px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "20px",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
          className="hardware-card"
        >
          {/* Image side */}
          <div
            style={{
              background: "linear-gradient(135deg, #161616 0%, #0f0f0f 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              borderRight: "1px solid #1e1e1e",
              minHeight: "280px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "180px",
                height: "180px",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,10,47,0.08)",
              }}
            >
              <Image
                src="/hk1-rbox-h8x.avif"
                alt="HK1 RBOX H8X Android 14 TV Box"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Details side */}
          <div style={{ padding: "36px 32px" }}>
            {/* Badge */}
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,10,47,0.1)",
                border: "1px solid rgba(255,10,47,0.25)",
                color: "#FF0A2F",
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "100px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              In Stock
            </span>

            <h3
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "4px",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              HK1 RBOX H8X
            </h3>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "24px" }}>
              Android 14 · Allwinner H728 · 8K UHD
            </p>

            <ul style={{ listStyle: "none", padding: 0, marginBottom: "28px" }}>
              {[
                "Android 14 OS",
                "Allwinner H728 Chip",
                "8K UHD Video Support",
                "Dual Band WiFi",
                "Built-in Cooling Fan",
                "Works with Punch TV",
              ].map((spec) => (
                <li
                  key={spec}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: "#9ca3af",
                    marginBottom: "8px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="#FF0A2F" style={{ flexShrink: 0 }}>
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {spec}
                </li>
              ))}
            </ul>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px" }}>Price Range</p>
              <p style={{ fontSize: "28px", fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>
                $150 – $200
              </p>
            </div>

            <a
              href="#contact"
              style={{
                display: "block",
                textAlign: "center",
                padding: "13px",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 700,
                background: "var(--punch-red)",
                color: "#fff",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--punch-red-dark)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(255,10,47,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--punch-red)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Order on WhatsApp
            </a>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#4b5563" }}>
          * Price is $150–$200 depending on availability. Contact us on WhatsApp for current stock.
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .hardware-card {
            grid-template-columns: 1fr !important;
          }
          .hardware-card > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid #1e1e1e;
            min-height: 220px !important;
          }
        }
      `}</style>
    </section>
  );
}
