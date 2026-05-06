"use client";
import React, { useEffect, useRef, useState } from "react";

const periods = {
  Week:  [36, 52, 41, 68, 75, 62, 88],
  Month: [44, 58, 65, 49, 82, 73, 91],
  Year:  [38, 46, 55, 69, 64, 78, 94],
};

const ALL_TXS = [
  { icon: "✈️", label: "Air France",           amount: "-€342",    color: "text-rose-400" },
  { icon: "🛒", label: "Carrefour",            amount: "-€67.40",  color: "text-white/70" },
  { icon: "☕", label: "Café Oberkampf",       amount: "-€4.80",   color: "text-white/70" },
  { icon: "💸", label: "Received – Lucas",     amount: "+€500",    color: "text-emerald-400" },
  { icon: "🎵", label: "Spotify",              amount: "-€9.99",   color: "text-white/70" },
  { icon: "🚖", label: "Uber",                amount: "-€18.20",  color: "text-white/70" },
  { icon: "🏠", label: "Rent – April",         amount: "-€1 200",  color: "text-rose-400" },
  { icon: "💊", label: "Pharmacy",             amount: "-€23.50",  color: "text-white/70" },
  { icon: "🍕", label: "Deliveroo",            amount: "-€31.80",  color: "text-white/70" },
  { icon: "📦", label: "Amazon",               amount: "-€54.99",  color: "text-white/70" },
  { icon: "💳", label: "Received – Stripe",    amount: "+€1 840",  color: "text-emerald-400" },
  { icon: "⛽", label: "Total Énergie",        amount: "-€82.00",  color: "text-white/70" },
  { icon: "🏋️", label: "FitArena Abonnement",  amount: "-€29.90",  color: "text-white/70" },
  { icon: "🎬", label: "Netflix",              amount: "-€15.99",  color: "text-white/70" },
  { icon: "🌍", label: "Wise – Transfer",      amount: "+€300",    color: "text-emerald-400" },
  { icon: "🍷", label: "Maison du Vin",        amount: "-€47.50",  color: "text-white/70" },
  { icon: "🚇", label: "RATP – Navigo",        amount: "-€86.40",  color: "text-white/70" },
  { icon: "📱", label: "Apple – iCloud+",      amount: "-€2.99",   color: "text-white/70" },
  { icon: "🏖️", label: "Airbnb – Nice",        amount: "-€420",    color: "text-rose-400" },
  { icon: "💡", label: "EDF Électricité",       amount: "-€94.20",  color: "text-white/70" },
];

const TIMES = ["just now", "1 min ago", "3 min ago", "8 min ago", "15 min ago", "30 min ago", "1 hr ago", "2 hr ago"];

function pickFour(exclude: typeof ALL_TXS = []) {
  const pool = ALL_TXS.filter((t) => !exclude.includes(t));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4).map((tx, i) => ({ ...tx, time: TIMES[i % TIMES.length] }));
}

export default function InsightsSection() {
  const [period, setPeriod]   = useState<keyof typeof periods>("Month");
  const [hovered, setHovered] = useState<number | null>(null);
  // 4 slots, each with its own tx and animation key
  const [slots, setSlots]     = useState<Array<(typeof ALL_TXS)[0] & { time: string }>>(
    () => pickFour()
  );
  const [slotKeys, setSlotKeys] = useState([0, 1, 2, 3]); // per-slot anim key
  const slotRef = useRef(0); // which slot to replace next

  // On mount: reveal rows one by one (stagger via animationDelay on initial render)
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setRevealed((v) => {
        if (v >= 4) { clearInterval(id); return v; }
        return v + 1;
      });
    }, 420);
    return () => clearInterval(id);
  }, []);

  // Every 2 s, swap one slot at a time (round-robin)
  useEffect(() => {
    const id = setInterval(() => {
      const slot = slotRef.current % 4;
      slotRef.current++;
      setSlots((prev) => {
        const next = [...prev];
        // pick a tx not currently shown
        const pool = ALL_TXS.filter((t) => !prev.some((p) => p.label === t.label));
        const pick = pool[Math.floor(Math.random() * pool.length)];
        next[slot] = { ...pick, time: TIMES[0] };
        return next;
      });
      setSlotKeys((prev) => {
        const next = [...prev];
        next[slot] = next[slot] + 10;
        return next;
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const values = periods[period];

  // Re-trigger bar animations on period change
  const [animKey, setAnimKey] = useState(0);
  const handlePeriod = (p: keyof typeof periods) => {
    setPeriod(p);
    setAnimKey((k) => k + 1);
  };

  const score = { Week: 88, Month: 91, Year: 94 }[period];

  return (
    <section
      id="insights"
      className="relative z-10 mx-auto w-full max-w-[88rem] px-6 py-16 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="cut grid overflow-hidden border border-orange-100/70 bg-white/70 shadow-console backdrop-blur-2xl lg:grid-cols-[0.85fr_1.15fr]">

        {/* ── Left column ── */}
        <div className="p-8 md:p-10">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2rem] text-orange-600">
            Spending intelligence
          </p>
          <h2 className="mt-4 max-w-xl text-4xl font-light leading-tight tracking-tight text-gray-950 md:text-6xl">
            See where your money moves before it becomes noise.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-gray-600">
            Live categories, merchant patterns, and travel-ready summaries help you adjust limits, budgets, and currency exposure with confidence.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["18%", "lower fees"],
              ["4.2s", "average transfer"],
              ["32",   "currencies tracked"],
            ].map(([value, label]) => (
              <div key={label} className="cut-sm bg-orange-50/80 p-4 shadow-ring">
                <p className="text-2xl font-light tracking-tight text-gray-950">{value}</p>
                <p className="mt-1 text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-5 border-t border-orange-100/80 bg-gray-950 p-6 text-white lg:border-l lg:border-t-0">

          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-white/50">Activity score</p>
              <h3 className="mt-1 text-3xl font-light tracking-tight tabular-nums transition-all duration-500">
                {score} / 100
              </h3>
            </div>
            <div className="flex rounded-full bg-white/10 p-1">
              {(Object.keys(periods) as (keyof typeof periods)[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePeriod(item)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-all ${
                    period === item
                      ? "bg-orange-500 text-white shadow-orange"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ── Bar chart ── */}
          <div className="relative flex h-40 items-stretch gap-2 overflow-hidden rounded-2xl bg-white/[0.04] px-4 pb-5 pt-4">
            {/* subtle grid lines */}
            {[25, 50, 75].map((pct) => (
              <div
                key={pct}
                className="pointer-events-none absolute inset-x-4 border-t border-white/[0.06]"
                style={{ bottom: `calc(${pct / 100} * (100% - 2.25rem) + 1.25rem)` }}
              />
            ))}

            {values.map((value, index) => (
              <div
                key={`${animKey}-${index}`}
                className="group relative flex flex-1 flex-col items-center justify-end gap-1.5"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* tooltip */}
                <span
                  className={`pointer-events-none absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-full rounded-full bg-white/10 px-2 py-0.5 text-[0.6rem] font-medium text-white backdrop-blur-sm transition-all duration-200 ${
                    hovered === index ? "opacity-100 -translate-y-8" : "opacity-0 -translate-y-7"
                  }`}
                >
                  {value}%
                </span>

                {/* bar wrapper */}
                <div className="relative flex-1 w-full">
                  {/* glow pulse behind active bar */}
                  {hovered === index && (
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 rounded-full bg-orange-500/30 blur-md"
                      style={{ height: `${value}%` }}
                    />
                  )}
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-orange-600 to-rose-400 transition-[height] duration-700 ease-out"
                    style={{
                      height: `${value}%`,
                      animation: `barRise 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s both`,
                      boxShadow: hovered === index
                        ? "0 0 18px rgba(234,88,12,0.7), 0 0 6px rgba(251,113,133,0.5)"
                        : "0 0 8px rgba(234,88,12,0.25)",
                      filter: hovered === index ? "brightness(1.15)" : "brightness(1)",
                    }}
                    aria-label={`Spending ${value}%`}
                  />
                </div>
                <span className="text-[0.6rem] text-white/30">{index + 1}</span>
              </div>
            ))}
          </div>

          {/* ── Top category + Suggested action ── */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="cut-sm bg-white/[0.06] p-4">
              <p className="text-xs text-white/45">Top category</p>
              <p className="mt-2 text-sm text-white">Travel and mobility</p>
            </div>
            <div className="cut-sm bg-white/[0.06] p-4">
              <p className="text-xs text-white/45">Suggested action</p>
              <p className="mt-2 text-sm text-white">Raise weekend card limit</p>
            </div>
          </div>

          {/* ── Live transaction feed ── */}
          <div className="flex flex-col gap-1 overflow-hidden rounded-2xl bg-white/[0.04] p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-white/45 tracking-wide uppercase font-medium">Live transactions</p>
              <span className="flex items-center gap-1.5 text-[0.6rem] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                real-time
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              {slots.map((tx, i) => (
                revealed > i ? (
                  <div
                    key={slotKeys[i]}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 transition-all hover:bg-white/[0.05]"
                    style={{ animation: `riseIn 0.42s cubic-bezier(0.16,1,0.3,1) both` }}
                  >
                    <span className="text-base leading-none">{tx.icon}</span>
                    <span className="flex-1 text-sm text-white/80">{tx.label}</span>
                    <span className={`text-sm font-medium tabular-nums ${tx.color}`}>{tx.amount}</span>
                    <span className="text-[0.6rem] text-white/30 min-w-[4.5rem] text-right">{tx.time}</span>
                  </div>
                ) : (
                  <div key={`placeholder-${i}`} className="h-[2.375rem]" />
                )
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}