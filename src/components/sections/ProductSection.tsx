"use client";
import React from "react";

export default function ProductSection() {
  const cards = [
    {
      icon: "solar:card-2-linear",
      title: "Disposable cards",
      text: "Generate a virtual card for each purchase, capped and automatically disabled after use."
    },
    {
      icon: "solar:global-linear",
      title: "Transparent exchange",
      text: "Convert across more than thirty currencies with a clear preview before confirmation."
    },
    {
      icon: "solar:shield-check-linear",
      title: "Instant controls",
      text: "Freeze, unfreeze, limit, or categorize spending from the same focused interface."
    }
  ];

  return (
    <section id="accounts" className="relative z-10 mx-auto grid w-full max-w-[88rem] gap-6 px-6 py-20 sm:px-8 md:px-12 lg:grid-cols-3 lg:px-16">
      {cards.map((card) => (
        <article key={card.title} className="cut group border border-orange-100/70 bg-white/72 p-6 shadow-ring backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-900/10">
          <div className="cut-sm mb-8 flex h-12 w-12 items-center justify-center bg-orange-50 text-orange-600 transition-transform group-hover:scale-110">
            <iconify-icon icon={card.icon} className="text-2xl" />
          </div>
          <h3 className="text-2xl font-medium tracking-tight text-gray-950">{card.title}</h3>
          <p className="mt-3 text-sm leading-6 text-gray-600">{card.text}</p>
        </article>
      ))}
    </section>
  );
}