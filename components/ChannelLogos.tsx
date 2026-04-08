import Image from "next/image";

const BASE_US = "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states";
const BASE_CA = "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/canada";

type Channel = {
  name: string;
  logo: string; // full URL
};

const ROW_1: Channel[] = [
  { name: "ESPN",         logo: `${BASE_US}/espn-us.png` },
  { name: "NHL on ESPN",  logo: `${BASE_US}/nhl-on-espn-us.png` },
  { name: "NFL Network",  logo: `${BASE_US}/nfl-network-us.png` },
  { name: "NBA TV",       logo: `${BASE_US}/nba-tv-us.png` },
  { name: "TSN",          logo: `${BASE_CA}/tsn-ca.png` },
  { name: "TBS",          logo: `${BASE_US}/tbs-us.png` },
  { name: "CNN",          logo: `${BASE_US}/cnn-us.png` },
  { name: "Syfy",         logo: `${BASE_US}/syfy-us.png` },
  { name: "MSNBC",        logo: `${BASE_US}/msnbc-hz-us.png` },
  { name: "HBO",          logo: `${BASE_US}/hbo-us.png` },
  { name: "Showtime",     logo: `${BASE_US}/showtime-us.png` },
  { name: "AMC",          logo: `${BASE_US}/amc-us.png` },
  { name: "FX",           logo: `${BASE_US}/fx-us.png` },
  { name: "MTV",          logo: `${BASE_US}/mtv-us.png` },
  { name: "Paramount",    logo: `${BASE_US}/paramount-network-us.png` },
];

const ROW_2: Channel[] = [
  { name: "Sportsnet",       logo: `${BASE_CA}/sportsnet-ca.png` },
  { name: "Comedy Central",  logo: `${BASE_US}/comedy-central-us.png` },
  { name: "Discovery",       logo: `${BASE_US}/discovery-channel-us.png` },
  { name: "Nat Geo",         logo: `${BASE_US}/national-geographic-us.png` },
  { name: "History",         logo: `${BASE_US}/history-channel-us.png` },
  { name: "A&E",             logo: `${BASE_US}/a-and-e-us.png` },
  { name: "Bravo",           logo: `${BASE_US}/bravo-us.png` },
  { name: "Lifetime",        logo: `${BASE_US}/lifetime-us.png` },
  { name: "Hallmark",        logo: `${BASE_US}/hallmark-channel-us.png` },
  { name: "Travel Channel",  logo: `${BASE_US}/travel-channel-us.png` },
  { name: "HGTV",            logo: `${BASE_US}/hgtv-us.png` },
  { name: "TNT",             logo: `${BASE_US}/tnt-us.png` },
  { name: "Crave",           logo: `${BASE_CA}/crave-ca.png` },
  { name: "Disney+",         logo: `${BASE_US}/disney-plus-us.png` },
  { name: "CBC",             logo: `${BASE_CA}/cbc-ca.png` },
];

function LogoBadge({ ch }: { ch: Channel }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        height: "48px",
        minWidth: "80px",
        padding: "8px 16px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "10px",
      }}
    >
      <Image
        src={ch.logo}
        alt={ch.name}
        height={30}
        width={80}
        style={{
          height: "30px",
          width: "auto",
          maxWidth: "80px",
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
          opacity: 0.85,
        }}
        unoptimized
      />
    </div>
  );
}

export default function ChannelLogos() {
  const r1 = [...ROW_1, ...ROW_1];
  const r2 = [...ROW_2, ...ROW_2];

  const maskStyle: React.CSSProperties = {
    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  };

  const trackBase: React.CSSProperties = {
    display: "flex",
    gap: "14px",
    width: "max-content",
    alignItems: "center",
  };

  return (
    <section style={{ background: "#080808", padding: "64px 0 56px", overflow: "hidden" }}>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "44px", padding: "0 24px" }}>
        <p style={{
          fontSize: "13px", fontWeight: 600, color: "var(--punch-red)",
          letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px",
        }}>
          Channel Lineup
        </p>
        <h2 style={{
          fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800,
          color: "#fff", letterSpacing: "-0.5px", marginBottom: "10px",
        }}>
          10,000+ channels included
        </h2>
        <p style={{ fontSize: "15px", color: "#6b7280" }}>
          Sports, news, entertainment, kids &amp; more — all in one subscription.
        </p>
      </div>

      {/* Marquee rows */}
      <div style={maskStyle}>

        {/* Row 1 — scrolls left */}
        <div style={{ overflow: "hidden", marginBottom: "14px" }}>
          <div
            className="channel-logos-track"
            style={{ ...trackBase, animation: "scroll-left 35s linear infinite" }}
          >
            {r1.map((ch, i) => <LogoBadge key={`r1-${i}`} ch={ch} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div style={{ overflow: "hidden" }}>
          <div
            className="channel-logos-track"
            style={{ ...trackBase, animation: "scroll-right 40s linear infinite" }}
          >
            {r2.map((ch, i) => <LogoBadge key={`r2-${i}`} ch={ch} />)}
          </div>
        </div>

      </div>
    </section>
  );
}
