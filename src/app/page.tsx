"use client";
import { useState } from "react";

import HeroSection from "@/components/sections/HeroSection";
import ProductSection from "@/components/sections/ProductSection";
import SecuritySection from "@/components/sections/SecuritySection";
import SignupSection from "@/components/sections/SignupSection";
import BankingConsole from "@/components/sections/BankingConsole";
import FAQSection from "@/components/sections/FAQSection";
import InsightsSection from "@/components/sections/InsightsSection";
import BentoSection from "@/components/sections/BentoSection";
import PricingSection from "@/components/sections/PricingSection";
import Toast from "@/components/shared/Toast";
import AmbientCanvas from "@/components/layout/AmbientCanvas";
import Footer from "@/components/layout/Footer";
import PixelBlast from "@/components/PixelBlast";
import LightRays from "@/components/LightRays";

export default function Home() {
  const [toast, setToast] = useState("");

  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.75]">
        <AmbientCanvas />
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.75]">
        <PixelBlast
          variant="square"
          pixelSize={2}
          color="#fd4a4a"
          patternScale={1.5}
          patternDensity={0.4}
          enableRipples={true}
          rippleSpeed={0.4}
          rippleThickness={0.15}
          rippleIntensityScale={0.6}
          speed={0.02}
          transparent
          edgeFade={0.6}
        />
      </div>
      <div className="glass-slices pointer-events-none fixed inset-y-0 right-0 z-0 w-[120vw] translate-x-[12%] overflow-hidden md:w-full md:translate-x-0">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="relative z-10 overflow-hidden">
        <HeroSection onToast={setToast} />
        <BentoSection />
        <ProductSection />
        <SecuritySection />
        <PricingSection />
        <SignupSection onToast={setToast} />
        <InsightsSection />
        <FAQSection />
        <Toast toast={toast} onClose={() => setToast("")} />
      </div>
      <Footer />
    </main>
  );
}
