"use client";
import React, { useMemo, useState } from "react";

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  const plans = useMemo(
    () => [
      {
        name: "Solo",
        price: annual ? 7 : 9,
        text: "For independent travelers, creators, and remote workers.",
        features: ["3 currency wallets", "Disposable virtual cards", "Real-time alerts"]
      },
      {
        name: "Plus",
        price: annual ? 15 : 19,
        text: "For households and frequent cross-border spending.",
        features: ["10 currency wallets", "Shared budgets", "Priority support"],
        featured: true
      },
      {
        name: "Business",
        price: annual ? 39 : 49,
        text: "For teams managing global payouts and operating costs.",
        features: ["Team cards", "Approval flows", "Export-ready reports"]
      }
    ],
    [annual]
  );

  return (
    <section id="pricing" className="relative z-10 mx-auto w-full max-w-[88rem] px-6 py-16 sm:px-8 md:px-12 lg:px-16">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2rem] text-orange-600">Simple pricing</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-tight text-gray-950 md:text-6xl">
            Start lean. Scale when your money moves further.
          </h2>
        </div>

        <div className="cut-sm flex w-max items-center gap-2 bg-white/75 p-1 shadow-ring backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`cut-sm px-4 py-2 text-sm transition-all ${!annual ? "bg-gray-950 text-white shadow-soft" : "text-gray-500 hover:text-gray-950"}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`cut-sm px-4 py-2 text-sm transition-all ${annual ? "bg-orange-600 text-white shadow-orange" : "text-gray-500 hover:text-gray-950"}`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`cut group border p-6 backdrop-blur-xl transition-all hover:-translate-y-1 ${
              plan.featured
                ? "border-orange-200 bg-gray-950 text-white shadow-console"
                : "border-orange-100/70 bg-white/72 text-gray-950 shadow-ring hover:shadow-2xl hover:shadow-orange-900/10"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-medium tracking-tight">{plan.name}</h3>
                <p className={`mt-2 text-sm leading-6 ${plan.featured ? "text-white/60" : "text-gray-600"}`}>{plan.text}</p>
              </div>
              {plan.featured && <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs text-orange-100">Popular</span>}
            </div>

            <div className="mt-7 flex items-end gap-1">
              <span className="text-5xl font-light tracking-tight">${plan.price}</span>
              <span className={`pb-2 text-sm ${plan.featured ? "text-white/50" : "text-gray-500"}`}>/mo</span>
            </div>

            <ul className="mt-7 grid gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${plan.featured ? "bg-white/10 text-orange-200" : "bg-orange-50 text-orange-600"}`}>
                    <iconify-icon icon="solar:check-circle-linear" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#signup"
              className={`cut mt-8 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm transition-all hover:-translate-y-0.5 ${
                plan.featured ? "bg-orange-600 text-white shadow-orange hover:bg-orange-500" : "bg-white text-orange-600 shadow-ring hover:text-orange-700"
              }`}
            >
              Choose {plan.name}
              <iconify-icon icon="solar:arrow-right-up-linear" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}