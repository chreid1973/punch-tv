type Channel = { name: string; color: string; bg: string };

const ROW_1: Channel[] = [
  { name: "ESPN",        color: "#DD0000", bg: "#DD000022" },
  { name: "Fox Sports",  color: "#4A90D9", bg: "#4A90D922" },
  { name: "NFL Network", color: "#5B9BD5", bg: "#5B9BD522" },
  { name: "NBA TV",      color: "#1D428A", bg: "#1D428A22" },
  { name: "TSN",         color: "#5599DD", bg: "#5599DD22" },
  { name: "beIN Sports", color: "#E4002B", bg: "#E4002B22" },
  { name: "CNN",         color: "#CC0000", bg: "#CC000022" },
  { name: "BBC News",    color: "#FF4444", bg: "#FF444422" },
  { name: "Fox News",    color: "#5588CC", bg: "#5588CC22" },
  { name: "MSNBC",       color: "#0057A3", bg: "#0057A322" },
  { name: "HBO",         color: "#00C2FF", bg: "#00C2FF1A" },
  { name: "Showtime",    color: "#FF3333", bg: "#FF333322" },
  { name: "AMC",         color: "#D4A017", bg: "#D4A01722" },
  { name: "FX",          color: "#CCCCCC", bg: "#FFFFFF10" },
  { name: "MTV",         color: "#A259FF", bg: "#A259FF22" },
];

const ROW_2: Channel[] = [
  { name: "Sportsnet",      color: "#E4002B", bg: "#E4002B22" },
  { name: "Comedy Central", color: "#FFE033", bg: "#FFE03322" },
  { name: "Discovery",      color: "#0099D9", bg: "#0099D922" },
  { name: "Nat Geo",        color: "#FFCC00", bg: "#FFCC0022" },
  { name: "History",        color: "#C8A951", bg: "#C8A95122" },
  { name: "A&E",            color: "#BFA050", bg: "#BFA05022" },
  { name: "Bravo",          color: "#C039B0", bg: "#C039B022" },
  { name: "Lifetime",       color: "#D4103C", bg: "#D4103C22" },
  { name: "Hallmark",       color: "#9E3CA8", bg: "#9E3CA822" },
  { name: "Food Network",   color: "#FF6B00", bg: "#FF6B0022" },
  { name: "HGTV",           color: "#72BF44", bg: "#72BF4422" },
  { name: "TLC",            color: "#009ADE", bg: "#009ADE22" },
  { name: "Crave",          color: "#9C44C0", bg: "#9C44C022" },
  { name: "Disney+",        color: "#1AA6E4", bg: "#1AA6E422" },
  { name: "Netflix",        color: "#E50914", bg: "#E5091422" },
];

function Badge({ ch }: { ch: Channel }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        whiteSpace: "nowrap",
        padding: "6px 16px",
        borderRadius: "6px",
        background: ch.bg,
        border: `1px solid ${ch.color}40`,
        color: ch.color,
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.03em",
      }}
    >
      {ch.name}
    </span>
  );
}

export default function ChannelLogos() {
  const r1 = [...ROW_1, ...ROW_1];
  const r2 = [...ROW_2, ...ROW_2];

  const maskStyle: React.CSSProperties = {
    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  };

  const trackBase: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    width: "max-content",
  };

  return (
    <section style={{ background: "#080808", padding: "64px 0 56px", overflow: "hidden" }}>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "40px", padding: "0 24px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--punch-red)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>
          Channel Lineup
        </p>
        <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: "10px" }}>
          10,000+ channels included
        </h2>
        <p style={{ fontSize: "15px", color: "#6b7280" }}>
          Sports, news, entertainment, kids &amp; more — all in one subscription.
        </p>
      </div>

      {/* Marquee rows */}
      <div style={maskStyle}>

        {/* Row 1 — scrolls left */}
        <div style={{ overflow: "hidden", marginBottom: "12px" }}>
          <div
            className="channel-logos-track"
            style={{ ...trackBase, animation: "scroll-left 28s linear infinite" }}
          >
            {r1.map((ch, i) => (
              <Badge key={`r1-${i}`} ch={ch} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div style={{ overflow: "hidden" }}>
          <div
            className="channel-logos-track"
            style={{ ...trackBase, animation: "scroll-right 32s linear infinite" }}
          >
            {r2.map((ch, i) => (
              <Badge key={`r2-${i}`} ch={ch} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
