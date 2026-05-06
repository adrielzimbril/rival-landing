"use client";
import React, { useMemo, useState } from "react";
import { initialAccounts, starterTransactions } from "@/data/banking";
import useLocalStorage from "@/hooks/useLocalStorage";
import { formatMoney } from "@/utils/formatMoney";

interface Props { onToast: (msg: string) => void; }

type ErrorState = { form?: string; recipient?: string; amount?: string };

export default function BankingConsole({ onToast }: Props) {
  const [accounts, setAccounts] = useLocalStorage("rival-accounts-en", initialAccounts);
  const [transactions, setTransactions] = useLocalStorage("rival-transactions-en", starterTransactions);
  const [currency, setCurrency] = useState<keyof typeof initialAccounts>("EUR");
  const [frozen, setFrozen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [transfer, setTransfer] = useState({ recipient: "Adriel Zimbril", amount: "75" });
  const [errors, setErrors] = useState<ErrorState>({});

  const active = accounts[currency];
  const amountNumber = Number(transfer.amount);

  const exchangePreview = useMemo(() => {
    if (!amountNumber || amountNumber < 0) return "$0.00";
    return formatMoney(amountNumber * 1.08, "$");
  }, [amountNumber]);

  const selectCurrency = (next: keyof typeof initialAccounts) => {
    if (next === currency) return;
    setCurrency(next);
    setSwitching(true);
    window.setTimeout(() => setSwitching(false), 520);
  };

  const validate = (): ErrorState => {
    const nextErrors: ErrorState = {};
    if (frozen) nextErrors.form = "Unfreeze your card before starting a transfer.";
    if (transfer.recipient.trim().length < 3) nextErrors.recipient = "Add a valid recipient name.";
    if (!amountNumber || amountNumber <= 0) nextErrors.amount = "The amount must be greater than zero.";
    if (amountNumber > active.balance) nextErrors.amount = "Insufficient balance on this account.";
    return nextErrors;
  };

  const submitTransfer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setAccounts((current) => ({
        ...current,
        [currency]: {
          ...current[currency],
          balance: Number((current[currency].balance - amountNumber).toFixed(2))
        }
      }));

      setTransactions((current) => [
        {
          id: Date.now(),
          name: transfer.recipient.trim(),
          value: -amountNumber,
          tag: "Instant",
          icon: "solar:plain-2-linear"
        },
        ...current.slice(0, 4)
      ]);

      setSubmitting(false);
      setTransfer({ recipient: "", amount: "" });
      setErrors({});
      onToast(`Transfer sent to ${transfer.recipient.trim()}.`);
    }, 900);
  };


  return (
    <aside id="demo" className="relative mx-auto w-full max-w-md lg:mx-0">
      <div className="absolute -inset-6 rounded-full bg-orange-300/20 blur-3xl" aria-hidden="true" />

      <div className="cut relative overflow-hidden border border-white/70 bg-white/68 p-4 shadow-console backdrop-blur-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18rem] text-orange-600">Rival Live</p>
            <h2 className="mt-1 text-xl font-medium tracking-tight text-gray-950">Banking console</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setFrozen((value) => !value);
              onToast(frozen ? "Rival card reactivated." : "Rival card frozen instantly.");
            }}
            className={`cut-sm flex items-center gap-2 px-3 py-2 text-xs transition-all ${
              frozen ? "bg-rose-50 text-rose-600 shadow-ring" : "bg-gray-950 text-white shadow-soft"
            }`}
          >
            <iconify-icon icon={frozen ? "solar:lock-keyhole-linear" : "solar:lock-unlocked-linear"} className="text-base" />
            {frozen ? "Frozen" : "Active"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Choose a currency">
          {Object.keys(accounts).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={currency === key}
              onClick={() => selectCurrency(key as keyof typeof initialAccounts)}
              className={`cut-sm px-3 py-2 text-sm transition-all ${
                currency === key ? "bg-orange-600 text-white shadow-orange" : "bg-white/70 text-gray-600 shadow-ring hover:text-gray-950"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="mt-4 cut bg-gray-950 p-5 text-white shadow-soft">
          {switching ? (
            <div className="space-y-3 py-2" aria-label="Loading account">
              <div className="h-3 w-28 animate-pulse rounded-full bg-white/15" />
              <div className="h-10 w-48 animate-pulse rounded-full bg-white/15" />
              <div className="h-3 w-36 animate-pulse rounded-full bg-white/15" />
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-white/55">{active.label}</p>
                  <p className="mt-2 text-4xl font-light tracking-tight">{formatMoney(active.balance, active.symbol)}</p>
                </div>
                <div className="cut-sm bg-white/10 px-3 py-2 text-right">
                  <p className="text-xs text-white/50">Cashback</p>
                  <p className="text-sm text-orange-200">1.4%</p>
                </div>
              </div>

              <div className="mt-7 flex items-end justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24rem] text-white/45">RIVAL BLACK</p>
                  <p className="mt-2 text-sm text-white/75">•••• 8416</p>
                </div>
                <div className="flex -space-x-2">
                  <span className="h-8 w-8 rounded-full bg-orange-500/85" />
                  <span className="h-8 w-8 rounded-full bg-rose-500/85 mix-blend-screen" />
                </div>
              </div>
            </>
          )}
        </div>

        <form onSubmit={submitTransfer} className="mt-4 grid gap-3" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1.5">
              <span className="text-xs text-gray-500">Recipient</span>
              <input
                value={transfer.recipient}
                onChange={(event) => setTransfer((current) => ({ ...current, recipient: event.target.value }))}
                className={`cut-sm w-full bg-white/80 px-3 py-3 text-sm text-gray-950 shadow-ring outline-none transition focus:shadow-focus ${
                  errors.recipient ? "ring-1 ring-rose-300" : ""
                }`}
                placeholder="Name"
                aria-invalid={Boolean(errors.recipient)}
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs text-gray-500">Amount</span>
              <input
                value={transfer.amount}
                onChange={(event) => setTransfer((current) => ({ ...current, amount: event.target.value }))}
                className={`cut-sm w-full bg-white/80 px-3 py-3 text-sm text-gray-950 shadow-ring outline-none transition focus:shadow-focus ${
                  errors.amount ? "ring-1 ring-rose-300" : ""
                }`}
                inputMode="decimal"
                placeholder="0"
                aria-invalid={Boolean(errors.amount)}
              />
            </label>
          </div>

          {(errors.recipient || errors.amount || errors.form) && (
            <p className="cut-sm bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {errors.form || errors.recipient || errors.amount}
            </p>
          )}

          <div className="flex items-center justify-between rounded-full bg-orange-50/80 px-4 py-2 text-xs text-orange-700">
            <span>Indicative USD conversion</span>
            <span>{exchangePreview}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="cut mt-1 flex items-center justify-center gap-2 bg-orange-600 px-5 py-3.5 text-sm font-normal text-white shadow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Secure processing
              </>
            ) : (
              <>
                Send now
                <iconify-icon icon="solar:arrow-right-up-linear" className="text-lg" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium tracking-tight text-gray-950">Recent activity</h3>
            <span className="text-xs text-gray-500">Real time</span>
          </div>
          <div className="grid gap-2">
            {transactions.slice(0, 3).map((item) => (
              <div key={item.id} className="cut-sm flex items-center justify-between bg-white/70 p-3 shadow-ring">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                    <iconify-icon icon={item.icon} className="text-lg" />
                  </span>
                  <div>
                    <p className="text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.tag}</p>
                  </div>
                </div>
                <p className={`text-sm ${item.value > 0 ? "text-emerald-600" : "text-gray-950"}`}>
                  {item.value > 0 ? "+" : "-"}
                  {formatMoney(item.value, active.symbol)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}