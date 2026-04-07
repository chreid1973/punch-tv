"use client";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px 80px",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,10,47,0.08) 0%, transparent 60%), #080808",
      }}
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,10,47,0.1) 0%, transparent 65%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div className="fade-up" style={{ marginBottom: "28px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,10,47,0.1)",
              border: "1px solid rgba(255,10,47,0.25)",
              borderRadius: "100px",
              padding: "6px 16px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#FF0A2F",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF0A2F", display: "inline-block" }} />
            Premium IPTV Service
          </span>
        </div>

        {/* Headline */}
        <h1
          className="fade-up-1"
          style={{
            fontSize: "clamp(44px, 8vw, 88px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: "24px",
            color: "#fff",
          }}
        >
          Stream Without{" "}
          <span className="gradient-text">Limits.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="fade-up-2"
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "#9ca3af",
            lineHeight: 1.7,
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Live TV, movies, and on-demand content — all in one place.
          Plans starting at <span style={{ color: "#fff", fontWeight: 600 }}>$15/month</span>. No contracts. Cancel anytime.
        </p>

        {/* CTAs */}
        <div
          className="fade-up-3"
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "64px",
          }}
        >
          <a
            href="#pricing"
            style={{
              background: "var(--punch-red)",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--punch-red-dark)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(255,10,47,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--punch-red)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            See Plans
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#contact"
            style={{
              background: "transparent",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 700,
              border: "1px solid #1e1e1e",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,10,47,0.4)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,10,47,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1e1e1e";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.847L.057 23.55a.75.75 0 00.921.921l5.703-1.471A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.656-.502-5.187-1.381l-.371-.214-3.843.99.99-3.843-.214-.371A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Order on WhatsApp
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "1px",
            background: "#1e1e1e",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #1e1e1e",
          }}
        >
          {[
            { value: "10,000+", label: "Live Channels" },
            { value: "HD & 4K", label: "Stream Quality" },
            { value: "Any Device", label: "TV, Phone, PC" },
            { value: "24/7", label: "Availability" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#0f0f0f",
                padding: "20px 16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: "4px",
                  letterSpacing: "-0.5px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
