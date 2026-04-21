const steps = [
  {
    step: "01",
    title: "Pick Your Plan",
    desc: "Choose between TV Only, VOD Only, or the Full Package. Add extras like adult content or 24/7 channels anytime.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Send Us a Message",
    desc: "Fill out the contact form with your name, email, and the plan you want. We'll confirm your order within the hour.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Start Streaming",
    desc: "We'll send you your credentials and setup instructions. You'll be watching within minutes of payment confirmation.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
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
            How It Works
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "#fff",
            }}
          >
            Up and running in 3 steps
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            position: "relative",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.step}
              style={{
                position: "relative",
              }}
            >
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "36px",
                    right: "-12px",
                    width: "24px",
                    height: "2px",
                    background: "linear-gradient(90deg, #1e1e1e, transparent)",
                    zIndex: 1,
                  }}
                />
              )}

              <div
                className="card-hover"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "16px",
                  padding: "32px 28px",
                }}
              >
                {/* Step number + icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      background: "rgba(255,10,47,0.08)",
                      border: "1px solid rgba(255,10,47,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--punch-red)",
                      flexShrink: 0,
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "36px",
                      fontWeight: 900,
                      color: "#1e1e1e",
                      letterSpacing: "-2px",
                      lineHeight: 1,
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
