import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Accounts", href: "#accounts" },
    { label: "Security", href: "#security" },
    { label: "Insights", href: "#insights" },
    { label: "Pricing", href: "#pricing" }
  ];

  return (
    <header className="anim-element flex items-center justify-between py-8">
      <a href="#hero" className="flex items-center gap-1 text-lg font-normal uppercase tracking-tight text-gray-950!" aria-label="Rival home">
        RIVAL<span className="text-xl leading-none text-orange-600!">°</span>
      </a>

      <nav className="hidden items-center gap-10 text-sm font-normal text-gray-600 md:flex" aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-gray-950">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-5 md:flex">
        <a href="#demo" className="text-sm font-normal text-gray-600! transition-colors hover:text-gray-950">
          Console
        </a>
        <a href="#signup" className="cut-sm bg-gray-950 px-4 py-2 text-sm font-normal text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-black">
          Open account
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="cut-sm flex h-10 w-10 items-center justify-center bg-white/70 text-gray-950 shadow-ring backdrop-blur md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <iconify-icon icon={open ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} className="text-2xl" />
      </button>

      {open && (
        <div className="absolute left-6 right-6 top-20 z-40 cut border border-orange-100 bg-white/90 p-3 shadow-2xl shadow-orange-900/10 backdrop-blur-xl md:hidden">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="cut-sm flex items-center justify-between px-4 py-3 text-sm text-gray-600! transition-colors hover:bg-orange-50 hover:text-orange-700"
              >
                {link.label}
                <iconify-icon icon="solar:arrow-right-up-linear" />
              </a>
            ))}

            <a
              href="#signup"
              onClick={() => setOpen(false)}
              className="cut-sm mt-1 flex items-center justify-between bg-gray-950 px-4 py-3 text-sm text-white transition-colors hover:bg-black"
            >
              Open account
              <iconify-icon icon="solar:arrow-right-up-linear" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}