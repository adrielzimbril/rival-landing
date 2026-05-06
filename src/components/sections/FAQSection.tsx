"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "Is Rival a real bank account?",
    answer: "Rival is designed as a digital banking experience with multi-currency balances, card controls, and transfer workflows for modern money movement."
  },
  {
    question: "Can I freeze a card instantly?",
    answer: "Yes. The console includes an instant freeze control, and the card state updates immediately with a confirmation notification."
  },
  {
    question: "Does Rival support multiple currencies?",
    answer: "Yes. The interface supports EUR, GBP, and USD in this demo, with a structure that can scale to additional wallets."
  },
  {
    question: "Are transfers validated before sending?",
    answer: "Every transfer checks recipient length, positive amount, available balance, and card status before the optimistic update is applied."
  }
];

export default function FAQSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="relative z-10 mx-auto grid w-full max-w-[88rem] gap-8 px-6 py-16 sm:px-8 md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2rem] text-orange-600">Questions</p>
        <h2 className="mt-4 max-w-lg text-4xl font-light leading-tight tracking-tight text-gray-950 md:text-6xl">
          Clear answers for borderless banking.
        </h2>
        <p className="mt-5 max-w-md text-base leading-7 text-gray-600">
          Everything in the product is built around transparent controls, fast feedback, and accessible decision making.
        </p>
      </div>

      <div className="grid gap-3">
        {faqs.map((item, index) => {
          const open = active === index;

          return (
            <article key={item.question} className="cut border border-orange-100/70 bg-white/72 shadow-ring backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setActive(open ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                aria-expanded={open}
              >
                <span className="text-lg font-medium tracking-tight text-gray-950">{item.question}</span>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${open ? "bg-orange-600 text-white rotate-45" : "bg-orange-50 text-orange-600"}`}>
                  <iconify-icon icon="solar:add-circle-linear" className="text-xl" />
                </span>
              </button>
              {open && (
                <div className="px-5 pb-5">
                  <p className="max-w-2xl text-sm leading-6 text-gray-600">{item.answer}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}