import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Punch TV — Stream Without Limits",
  description:
    "Premium IPTV service with thousands of live channels, movies & TV shows. Full package from $20/month. Hardware available. Order via WhatsApp.",
  keywords: ["IPTV", "Punch TV", "live TV", "streaming", "VOD", "IPTV Canada", "IPTV box"],
  openGraph: {
    title: "Punch TV — Stream Without Limits",
    description:
      "Premium IPTV service. Live TV + VOD. Full package from $20/month.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
