"use client";
import React from "react";

export default function SecuritySection() {
  return (
    <section id="security" className="relative z-10 mx-auto grid w-full max-w-[88rem] gap-10 px-6 py-16 sm:px-8 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-16">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2rem] text-orange-600">Adaptive security</p>
        <h2 className="mt-4 max-w-xl text-4xl font-light leading-tight tracking-tight text-gray-950 md:text-6xl">
          Your money stays mobile. Not vulnerable.
        </h2>
        <p className="mt-5 max-w-lg text-base leading-7 text-gray-600">
          Rival watches for unusual signals, isolates risky payments, and lets you confirm sensitive activity with clear, immediate controls.
        </p>
      </div>

      <div className="cut overflow-hidden border border-white/70 bg-gray-950 p-3 shadow-console">
        <div className="relative min-h-96 overflow-hidden cut bg-orange-50">
          <img
            src="/images/secure_payment_lisbon.png"
            alt="Secure mobile payment"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/55 to-transparent" />
          <div className="relative flex h-full min-h-96 flex-col justify-end p-6 text-white">
            <div className="cut max-w-sm bg-white/10 p-5 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2rem] text-orange-200">Signal detected</span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-100">Protected</span>
              </div>
              <h3 className="text-2xl font-medium tracking-tight">Payment verified in Lisbon</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                The transaction matches your location, trusted device, and usual spending rhythm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}