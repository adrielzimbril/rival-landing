"use client";
import { useEffect, useRef, useState } from "react";

// ── helpers ──────────────────────────────────────────────────────────────────

function rand(min: number, max: number) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

// ── Forex ticker ─────────────────────────────────────────────────────────────

const PAIRS = [
  { label: "EUR/USD", base: 1.0842 },
  { label: "GBP/USD", base: 1.2671 },
  { label: "USD/JPY", base: 154.32 },
  { label: "EUR/GBP", base: 0.8556 },
];

function useForex() {
  const [rates, setRates] = useState(PAIRS.map((p) => ({ ...p, value: p.base, delta: 0 })));
  useEffect(() => {
    const id = setInterval(() => {
      setRates((prev) =>
        prev.map((r) => {
          const delta = rand(-0.003, 0.003);
          return { ...r, value: +(r.value + delta).toFixed(4), delta };
        })
      );
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return rates;
}

// ── Budget donut ──────────────────────────────────────────────────────────────

const BUDGET_CATS = [
  { label: "Housing",   pct: 34, color: "#ea580c" },
  { label: "Food",      pct: 22, color: "#fb923c" },
  { label: "Transport", pct: 14, color: "#fdba74" },
  { label: "Health",    pct: 12, color: "#fde68a" },
  { label: "Leisure",   pct: 10, color: "#86efac" },
  { label: "Other",     pct: 8,  color: "#94a3b8" },
];

function DonutChart({ active, onHover }: { active: number | null; onHover: (i: number | null) => void }) {
  const R = 52, cx = 64, cy = 64, stroke = 18;
  const circ = 2 * Math.PI * R;
  let offset = 0;
  return (
    <svg viewBox="0 0 128 128" className="w-full max-w-[9rem] shrink-0">
      {BUDGET_CATS.map((cat, i) => {
        const dash = (cat.pct / 100) * circ;
        const gap = circ - dash;
        const el = (
          <circle
            key={i}
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke={cat.color}
            strokeWidth={active === i ? stroke + 3 : stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            style={{ transition: "stroke-width 0.2s, opacity 0.2s", opacity: active !== null && active !== i ? 0.3 : 1, cursor: "pointer" }}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
          />
        );
        offset += dash + 1.8;
        return el;
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#030712" fontSize="11" fontWeight="600">
        {active !== null ? BUDGET_CATS[active].pct + "%" : "€3 480"}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#6b7280" fontSize="7.5">
        {active !== null ? BUDGET_CATS[active].label : "/ month"}
      </text>
    </svg>
  );
}

// ── Savings goal ──────────────────────────────────────────────────────────────

const GOAL = 5000;

// ── Notification card ─────────────────────────────────────────────────────────

const NOTIFS = [
  { icon: "💸", title: "Payment received", body: "+€1 840 from Stripe", sub: "Rival Business · just now" },
  { icon: "✈️", title: "Trip protection active", body: "Air France — Paris → NYC", sub: "Auto-converted · $382 USD" },
  { icon: "🔔", title: "Budget alert", body: "You've hit 80% of Food", sub: "Rival Insights · 2 min ago" },
  { icon: "💳", title: "Card used abroad", body: "-€73.20 at ZARA Madrid", sub: "No FX fee applied · now" },
  { icon: "🎯", title: "Goal reached!", body: "Tokyo Trip — €5 000 saved", sub: "Rival Goals · 1 hr ago" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function BentoSection() {
  // ── notification ──
  const [notifIdx, setNotifIdx] = useState(0);
  const [notifVisible, setNotifVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setNotifVisible(false);
      setTimeout(() => {
        setNotifIdx((i) => (i + 1) % NOTIFS.length);
        setNotifVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // ── budget donut ──
  const [budgetActive, setBudgetActive] = useState<number | null>(null);

  // ── forex ──
  const rates = useForex();

  // ── card flip ──
  const [flipped, setFlipped] = useState(false);

  // ── savings ──
  const [saved, setSaved] = useState(3_240);

  // ── security ──
  const [bio, setBio] = useState(true);
  const [scanning, setScanning] = useState(false);
  const scanRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toggleBio = () => {
    setScanning(true);
    scanRef.current = setTimeout(() => { setBio((b) => !b); setScanning(false); }, 1400);
  };
  useEffect(() => () => { if (scanRef.current) clearTimeout(scanRef.current); }, []);

  const pct = Math.min((saved / GOAL) * 100, 100);
  const notif = NOTIFS[notifIdx];

  return (
    <section
      id="bento"
      className="relative z-10 mx-auto w-full max-w-[88rem] px-6 py-8 sm:px-8 md:px-12 lg:px-16"
    >
      {/* header */}
      <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2rem] text-orange-600">
            Platform features
          </p>
          <h2 className="mt-3 text-3xl font-light leading-tight tracking-tight text-gray-950 sm:text-4xl">
            Everything in one place.
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-gray-500">
          Hover, click, and interact — every card is a live simulation of the Rival experience.
        </p>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">

        {/* ── 1. Live notification ── (tall) */}
        <div className="cut bg-white/70 p-6 flex flex-col gap-5 row-span-2 col-span-1 shadow-console border border-orange-100 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-orange-600">Live activity</p>
            <span className="flex items-center gap-1.5 text-[0.6rem] text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              streaming
            </span>
          </div>

          {/* notification bubble */}
          <div
            className="flex-1 flex items-center justify-center"
            style={{ transition: "opacity 0.35s, transform 0.35s", opacity: notifVisible ? 1 : 0, transform: notifVisible ? "translateY(0)" : "translateY(12px)" }}
          >
            <div className="cut-sm w-full bg-white p-5 border border-orange-100 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="text-3xl leading-none mt-0.5">{notif.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-950 truncate">{notif.title}</p>
                  <p className="mt-1 text-sm text-orange-600 font-mono truncate">{notif.body}</p>
                  <p className="mt-2 text-[0.65rem] text-gray-500">{notif.sub}</p>
                </div>
              </div>
            </div>
          </div>

          {/* dot indicators */}
          <div className="flex justify-center gap-1.5">
            {NOTIFS.map((_, i) => (
              <span
                key={i}
                className="rounded-full transition-all duration-300"
                style={{ width: i === notifIdx ? "1.25rem" : "0.375rem", height: "0.375rem", background: i === notifIdx ? "#ea580c" : "rgba(0,0,0,0.1)" }}
              />
            ))}
          </div>

          {/* balance display */}
          <div className="cut-sm bg-white/80 p-4 border border-orange-100/50">
            <p className="text-[0.65rem] text-gray-500 uppercase tracking-wider">Current balance</p>
            <p className="mt-1 text-2xl font-light text-gray-950 tabular-nums">€12,480<span className="text-sm text-gray-500">.50</span></p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-xs text-emerald-500">↑ +€1 840</span>
              <span className="text-[0.65rem] text-gray-500">today</span>
            </div>
          </div>
        </div>

        {/* ── 2. Budget donut ── */}
        <div className="cut bg-white/70 p-6 flex flex-col gap-4 shadow-console border border-orange-100 backdrop-blur-md col-span-1">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500">Monthly budget</p>
          <div className="flex items-center gap-4">
            <DonutChart active={budgetActive} onHover={setBudgetActive} />
            <div className="flex flex-col gap-1.5 min-w-0">
              {BUDGET_CATS.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 cursor-pointer"
                  style={{ opacity: budgetActive !== null && budgetActive !== i ? 0.35 : 1, transition: "opacity 0.2s" }}
                  onMouseEnter={() => setBudgetActive(i)}
                  onMouseLeave={() => setBudgetActive(null)}
                >
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className="text-[0.65rem] text-gray-600 truncate">{c.label}</span>
                  <span className="ml-auto text-[0.65rem] text-gray-500 tabular-nums">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. Forex ticker ── */}
        <div className="cut bg-white/70 p-6 flex flex-col gap-3 shadow-console border border-orange-100 backdrop-blur-md col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">FX rates</p>
            <span className="text-[0.6rem] text-orange-500 font-mono animate-pulse">● LIVE</span>
          </div>
          <div className="flex flex-col gap-2">
            {rates.map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-orange-50">
                <span className="text-xs text-gray-600 font-mono">{r.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-950 tabular-nums font-mono">{r.value}</span>
                  <span
                    className="text-[0.6rem] tabular-nums font-mono"
                    style={{ color: r.delta >= 0 ? "#10b981" : "#f43f5e", transition: "color 0.3s" }}
                  >
                    {r.delta >= 0 ? "▲" : "▼"} {Math.abs(r.delta).toFixed(4)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Savings goal ── */}
        <div className="cut bg-white/70 p-6 flex flex-col gap-4 shadow-console border border-orange-100 backdrop-blur-md col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">Savings goal</p>
            <span className="text-[0.65rem] text-orange-500">Tokyo trip ✈️</span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-950 tabular-nums">€{saved.toLocaleString("fr-FR")}</span>
              <span className="text-gray-500">/ €{GOAL.toLocaleString("fr-FR")}</span>
            </div>
            {/* progress bar */}
            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #ea580c, #fb923c)",
                  transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: "0 0 12px rgba(234,88,12,0.5)",
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[0.65rem] text-gray-500">
              <span>{pct.toFixed(0)}% reached</span>
              <span>€{(GOAL - saved).toLocaleString("fr-FR")} left</span>
            </div>
          </div>

          <button
            onClick={() => setSaved((s) => Math.min(s + 50, GOAL))}
            disabled={saved >= GOAL}
            className="cut-sm w-full bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-orange"
          >
            {saved >= GOAL ? "🎉 Goal reached!" : "+ Add €50"}
          </button>
        </div>

        {/* ── 5. Security / Biometric ── */}
        <div className="cut bg-white/70 p-6 flex flex-col gap-5 shadow-console border border-orange-100 backdrop-blur-md col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">Security</p>
            <span className={`text-[0.6rem] font-medium px-2 py-0.5 rounded-full ${bio ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>
              {bio ? "Protected" : "Disabled"}
            </span>
          </div>

          {/* fingerprint visual */}
          <div className="flex justify-center">
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full cursor-pointer"
              style={{ background: bio ? "radial-gradient(circle, rgba(234,88,12,0.15), transparent 70%)" : "radial-gradient(circle, rgba(251,113,133,0.12), transparent 70%)", border: `2px solid ${bio ? "rgba(234,88,12,0.4)" : "rgba(251,113,133,0.3)"}`, transition: "all 0.4s" }}
              onClick={toggleBio}
            >
              {scanning && (
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(234,88,12,0.15)", animationDuration: "1s" }}
                />
              )}
              <iconify-icon
                icon={scanning ? "solar:refresh-linear" : bio ? "solar:fingerprint-linear" : "solar:lock-broken-linear"}
                className="text-4xl"
                style={{ color: bio ? "#ea580c" : "#f43f5e", transition: "color 0.3s", animation: scanning ? "spin 1s linear infinite" : "none" }}
              />
            </div>
          </div>

          {/* toggle rows */}
          {[
            { label: "Biometric login", active: bio },
            { label: "Transaction alerts", active: true },
            { label: "2FA on transfers", active: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-xs text-gray-600">{item.label}</span>
              <div
                className="relative h-5 w-9 rounded-full transition-all duration-300 cursor-pointer"
                style={{ background: item.active ? "#ea580c" : "rgba(0,0,0,0.1)" }}
                onClick={i === 0 ? toggleBio : undefined}
              >
                <span
                  className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all duration-300 shadow-sm"
                  style={{ left: item.active ? "calc(100% - 1.125rem)" : "0.125rem" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── 6. Card flip ── */}
        <div
          className="cut flex flex-col items-center justify-center gap-3 bg-white/70 p-6 shadow-console border border-orange-100 backdrop-blur-md col-span-1 sm:col-span-2 lg:col-span-2 cursor-pointer select-none"
          onClick={() => setFlipped((f) => !f)}
          style={{ perspective: "900px" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500 self-start">Your card</p>

          <div
            className="relative w-full max-w-[17rem] h-[9.5rem]"
            style={{ transformStyle: "preserve-3d", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}
          >
            {/* front */}
            <div
              className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between"
              style={{ backfaceVisibility: "hidden", background: "linear-gradient(135deg, #1c1917 0%, #292524 60%, #1c1917 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex justify-between items-start">
                <div className="logo-symbol text-sm"><span /></div>
                <iconify-icon icon="solar:wifi-router-linear" className="text-white/30 text-xl" />
              </div>
              <div>
                <p className="text-[0.65rem] text-white/30 tracking-widest mb-1">CARD NUMBER</p>
                <p className="text-sm font-mono text-white/70 tracking-widest">•••• •••• •••• 4291</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[0.55rem] text-white/30 tracking-wider">HOLDER</p>
                  <p className="text-xs text-white/70">ADRIEL ZIMBRIL</p>
                </div>
                <div className="text-right">
                  <p className="text-[0.55rem] text-white/30 tracking-wider">EXPIRES</p>
                  <p className="text-xs text-white/70">05/28</p>
                </div>
              </div>
            </div>

            {/* back */}
            <div
              className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-center gap-4"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg, #292524, #1c1917)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="h-8 w-full rounded bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="h-6 flex-1 rounded bg-white/[0.06]" />
                <div className="cut-sm bg-orange-600/80 px-3 py-1 text-xs text-white font-mono tracking-widest">291</div>
              </div>
              <p className="text-[0.6rem] text-white/20 text-center">Tap to flip back</p>
            </div>
          </div>

          <p className="text-[0.65rem] text-gray-500">Tap to reveal CVV</p>
        </div>

      </div>
    </section>
  );
}
