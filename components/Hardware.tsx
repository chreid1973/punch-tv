"use client";

const boxes = [
  {
    name: "H96 Max",
    subtitle: "Android 14 · Quad-Core S905L3",
    specs: ["2GB RAM / 16GB Storage", "Android 14 OS", "Google Voice Assistant", "4K HDR Support", "Dual WiFi + BT"],
    priceRange: "$100 – $150",
    badge: "Best Seller",
    link: "https://www.aliexpress.com/item/1005010526667154.html",
    gradient: "linear-gradient(135deg, #1a1a1a, #111)",
    accentColor: "#FF0A2F",
  },
  {
    name: "X96Q",
    subtitle: "Android 10 · Allwinner H313",
    specs: ["2GB RAM / 16GB Storage", "Android 10 OS", "2.4G WiFi Built-in", "HD Streaming", "Compact Design"],
    priceRange: "$80 – $130",
    badge: "Budget Pick",
    link: "https://www.aliexpress.com/item/1005009870066841.html",
    gradient: "linear-gradient(135deg, #1a1a1a, #111)",
    accentColor: "#FF0A2F",
  },
];

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

        {/* Box Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            maxWidth: "760px",
            margin: "0 auto 40px",
          }}
        >
          {boxes.map((box) => (
            <div
              key={box.name}
              className="card-hover"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(255,10,47,0.12)",
                  border: "1px solid rgba(255,10,47,0.25)",
                  color: "#FF0A2F",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "100px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {box.badge}
              </div>

              {/* Box visual placeholder */}
              <div
                style={{
                  height: "180px",
                  background:
                    "linear-gradient(135deg, #161616 0%, #0f0f0f 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid #1e1e1e",
                }}
              >
                <div
                  style={{
                    width: "110px",
                    height: "70px",
                    background: "linear-gradient(145deg, #252525, #1a1a1a)",
                    borderRadius: "10px",
                    border: "1px solid #2e2e2e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(255,10,47,0.08)",
                    position: "relative",
                  }}
                >
                  {/* LED dot */}
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "12px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#FF0A2F",
                      boxShadow: "0 0 8px #FF0A2F",
                    }}
                  />
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#444"
                    strokeWidth={1.5}
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: "4px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {box.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
                  {box.subtitle}
                </p>

                <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
                  {box.specs.map((spec) => (
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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="#FF0A2F"
                        style={{ flexShrink: 0 }}
                      >
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

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>
                      Price Range
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "#fff",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {box.priceRange}
                    </p>
                  </div>

                  <a
                    href={box.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "var(--punch-red)",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--punch-red-dark)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--punch-red)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    View on AliExpress
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#4b5563",
          }}
        >
          * Box prices vary based on availability. Contact us on WhatsApp for current stock and pricing.
        </p>
      </div>
    </section>
  );
}
