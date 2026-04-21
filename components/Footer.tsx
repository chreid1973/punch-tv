"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Home", href: "#home" },
    { label: "Pricing", href: "#pricing" },
    { label: "Hardware", href: "#hardware" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      style={{
        background: "#080808",
        borderTop: "1px solid #1e1e1e",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* Logo + tagline */}
        <div>
          <a href="#home" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#fff",
              }}
            >
              PUNCH{" "}
              <span style={{ color: "var(--punch-red)" }}>TV</span>
            </span>
          </a>
          <p style={{ fontSize: "12px", color: "#4b5563", marginTop: "4px" }}>
            Stream Without Limits
          </p>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: "13px",
                color: "#6b7280",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#fff")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#6b7280")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p style={{ fontSize: "12px", color: "#4b5563" }}>
          &copy; {year} Punch TV. All rights reserved.
        </p>
      </div>

      {/* Disclaimer */}
      <div style={{ maxWidth: "1100px", margin: "20px auto 0", borderTop: "1px solid #1a1a1a", paddingTop: "16px" }}>
        <p style={{ fontSize: "11px", color: "#374151", lineHeight: 1.6, textAlign: "center" }}>
          *Some TVs may not be compatiable & will require a IPTV box or third party device for service. For entertainment purposes only. Content availability may vary by region.
          Sports blackouts may apply on select live events. Punch TV is not affiliated with any broadcast network or streaming service.
        </p>
      </div>
    </footer>
  );
}
