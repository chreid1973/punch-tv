"use client";

export default function Contact() {
  // Replace with your actual WhatsApp number (include country code, no + or spaces)
  const whatsappNumber = "1XXXXXXXXXX";
  const whatsappMessage = encodeURIComponent(
    "Hey! I'm interested in Punch TV. Can you help me set up a plan?"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" style={{ padding: "90px 24px", background: "#080808" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        {/* Header */}
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
            marginBottom: "14px",
          }}
        >
          Ready to punch in?
        </h2>
        <p
          style={{
            color: "#6b7280",
            fontSize: "16px",
            marginBottom: "56px",
            maxWidth: "480px",
            margin: "0 auto 56px",
          }}
        >
          Scan the QR code or tap the button to reach us directly on WhatsApp.
          We reply fast.
        </p>

        {/* Card */}
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            background: "#111",
            border: "1px solid #1e1e1e",
            borderRadius: "20px",
            padding: "40px 48px",
            maxWidth: "420px",
            width: "100%",
          }}
        >
          {/* QR Code */}
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#4b5563",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Scan to message us
            </p>

            {/* QR image — drop your WhatsApp QR code image into public/whatsapp-qr.png */}
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "14px",
                overflow: "hidden",
                border: "2px solid #1e1e1e",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/whatsapp-qr.png"
                alt="Punch TV WhatsApp QR Code"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onError={(e) => {
                  // Fallback placeholder if image not found
                  const el = e.currentTarget;
                  el.style.display = "none";
                  el.parentElement!.innerHTML = `
                    <div style="text-align:center;padding:16px;">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="#25d366" style="margin:0 auto 8px;display:block">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.847L.057 23.55a.75.75 0 00.921.921l5.703-1.471A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.656-.502-5.187-1.381l-.371-.214-3.843.99.99-3.843-.214-.371A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                      </svg>
                      <p style="color:#6b7280;font-size:12px;margin:0">Add whatsapp-qr.png<br/>to the public/ folder</p>
                    </div>
                  `;
                }}
              />
            </div>

            <p
              style={{
                fontSize: "13px",
                color: "#4b5563",
                marginTop: "12px",
              }}
            >
              Punch TV · WhatsApp Community
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "100%",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
            <span style={{ fontSize: "12px", color: "#4b5563" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
          </div>

          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#25d366",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 700,
              width: "100%",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#1dad55";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(37,211,102,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#25d366";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.847L.057 23.55a.75.75 0 00.921.921l5.703-1.471A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.656-.502-5.187-1.381l-.371-.214-3.843.99.99-3.843-.214-.371A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Message Us on WhatsApp
          </a>

          <p style={{ fontSize: "12px", color: "#4b5563" }}>
            Typically reply within minutes
          </p>
        </div>
      </div>
    </section>
  );
}
