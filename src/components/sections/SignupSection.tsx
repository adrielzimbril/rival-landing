"use client";
import React, { useState } from "react";

export default function SignupSection({ onToast }: { onToast: (msg: string) => void }) {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Solo");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setEmail("");
      onToast(`Your Rival ${plan} invitation has been reserved.`);
    }, 850);
  };

  return (
    <section id="signup" className="relative z-10 mx-auto w-full max-w-[88rem] px-6 pb-24 pt-12 sm:px-8 md:px-12 lg:px-16">
      <div className="cut grid overflow-hidden border border-orange-100 bg-white/75 shadow-console backdrop-blur-2xl lg:grid-cols-[1fr_0.8fr]">
        <div className="p-8 md:p-12">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2rem] text-orange-600">Early access</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-tight text-gray-950 md:text-6xl">
            Join the bank designed for a life in motion.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
            Get an invitation, configure your limits, and test instant transfers as soon as your region opens.
          </p>

          <form onSubmit={submit} className="mt-8 grid max-w-xl gap-3 sm:grid-cols-[1fr_auto]" noValidate>
            <div>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`cut w-full bg-white px-5 py-4 text-sm text-gray-950 shadow-ring outline-none transition focus:shadow-focus ${
                  error ? "ring-1 ring-rose-300" : ""
                }`}
                placeholder="you@company.com"
                aria-label="Email address"
                aria-invalid={Boolean(error)}
              />
              {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="cut flex items-center justify-center gap-2 bg-gray-950 px-6 py-4 text-sm text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-black disabled:opacity-70"
            >
              {loading ? "Sending..." : "Request access"}
              {!loading && <iconify-icon icon="solar:arrow-right-up-linear" className="text-lg" />}
            </button>
          </form>
        </div>

        <div className="border-t border-orange-100/80 bg-orange-50/60 p-8 lg:border-l lg:border-t-0">
          <p className="mb-4 text-sm text-gray-600">Preferred profile</p>
          <div className="grid gap-3">
            {["Solo", "Family", "Business"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPlan(item)}
                className={`cut-sm flex items-center justify-between px-4 py-4 text-left transition-all ${
                  plan === item ? "bg-orange-600 text-white shadow-orange" : "bg-white/80 text-gray-700 shadow-ring hover:text-gray-950"
                }`}
              >
                <span>{item}</span>
                <iconify-icon icon={plan === item ? "solar:check-circle-linear" : "solar:round-alt-arrow-right-linear"} className="text-xl" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}