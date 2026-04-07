const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
    title: "Every Screen, Every Device",
    desc: "Watch on Smart TVs, phones, tablets, laptops, and IPTV boxes. One subscription, all your screens.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M15 10l4.553-2.553A1 1 0 0121 8.382V15.5a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "HD & 4K Quality",
    desc: "Crystal-clear streams with automatic quality adjustment. Enjoy your content the way it was meant to be seen.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M7 4V2m10 2V2M3 9h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Live TV + VOD Library",
    desc: "Thousands of live channels plus an on-demand library packed with the latest movies and TV series.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 1v22M4.5 8.5l15 7M4.5 15.5l15-7" strokeLinecap="round" />
      </svg>
    ),
    title: "Simple Bundling",
    desc: "Stack TV, VOD, and add-ons to build your perfect package. The more you bundle, the more you save.",
  },
];

export default function Features() {
  return (
    <section style={{ padding: "90px 24px", background: "#080808" }}>
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
            Why Punch TV
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "#fff",
            }}
          >
            Everything you need, nothing you don&apos;t
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="card-hover"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "14px",
                padding: "28px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  background: "rgba(255,10,47,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--punch-red)",
                  marginBottom: "20px",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "10px",
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
