"use client";
import React from "react";
import Header from "@/components/layout/Header";
import FeaturePill from "@/components/shared/FeaturePill";
import BankingConsole from "@/components/sections/BankingConsole";

export default function HeroSection({ onToast }: { onToast: (message: string) => void }) {
  return (
    <div id="hero" className="relative z-10 mx-auto flex min-h-screen w-full max-w-[88rem] flex-col px-6 sm:px-8 md:px-12 lg:px-16">
      <Header />

      <main className="grid flex-1 items-center gap-12 pb-16 pt-12 lg:grid-cols-[1fr_28rem] lg:pb-20">
        <section className="max-w-3xl">
          <div className="anim-element cut-sm mb-8 inline-flex w-max items-center gap-2 border border-transparent bg-orange-50/70 px-3.5 py-1.5 text-xs font-normal text-orange-600 shadow-ring backdrop-blur-md">
            <iconify-icon icon="solar:wallet-money-linear" className="text-base" />
            Multi-currency digital banking
          </div>

          <h1 className="text-5xl font-light leading-[1.04] tracking-tight text-gray-950 sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="reveal-line"><span>Pay</span></span>{" "}
            <span className="reveal-line"><span>anywhere.</span></span>
            <br />
            <span className="reveal-line"><span>Exchange</span></span>{" "}
            <span className="reveal-line"><span>without friction.</span></span>
            <br />
            <span className="reveal-line">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Stay in control.
              </span>
            </span>
          </h1>

          <p className="anim-element mt-7 max-w-[32rem] text-base leading-7 text-gray-600 md:text-lg">
            Rival brings accounts, virtual cards, instant currency exchange, and proactive security into one clear interface — built for travel, creation, and borderless income.
          </p>

          <div className="anim-element mt-10 flex flex-wrap items-center gap-4">
            <a href="#signup" className="cut inline-flex items-center justify-center gap-2 bg-gray-950 px-7 py-3.5 text-sm font-normal text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-black">
              Open Rival
              <iconify-icon icon="solar:arrow-right-up-linear" className="text-lg opacity-80" />
            </a>
            <a href="#demo" className="cut inline-flex items-center justify-center border border-transparent bg-white/60 px-7 py-3.5 text-sm font-normal text-orange-600! shadow-ring backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:text-orange-700">
              Try the console
            </a>
          </div>
        </section>

        <BankingConsole onToast={onToast} />
      </main>

      <div className="anim-element flex flex-col gap-10 pb-12 pt-8 sm:flex-row sm:gap-14">
        <FeaturePill icon="solar:global-linear" title="Instant exchange" text="Clear rates before every move" />
        <FeaturePill icon="solar:cardholder-linear" title="Smart cards" text="Freeze, limits, and disposable cards" />
        <FeaturePill icon="solar:shield-network-linear" title="Active security" text="Contextual alerts in real time" />
        <FeaturePill icon="solar:wallet-money-linear" title="Multi-currency accounts" text="Hold USD, EUR, GBP, and more" />
      </div>
    </div>
  );
}