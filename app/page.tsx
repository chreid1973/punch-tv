import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChannelLogos from "@/components/ChannelLogos";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import PriceCalculator from "@/components/PriceCalculator";
import Hardware from "@/components/Hardware";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <Hero />
      <ChannelLogos />
      <hr className="section-divider" />
      <Features />
      <hr className="section-divider" />
      <Pricing />
      <hr className="section-divider" />
      <PriceCalculator />
      <hr className="section-divider" />
      <Hardware />
      <hr className="section-divider" />
      <HowItWorks />
      <hr className="section-divider" />
      <Contact />
      <Footer />
    </main>
  );
}
