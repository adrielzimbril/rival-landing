"use client";
import React, { useEffect } from "react";

export default function Toast({ toast, onClose }: { toast: string; onClose: () => void }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(onClose, 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-orange-200/80 bg-white/85 px-4 py-3 text-sm text-gray-800 shadow-2xl shadow-orange-900/10 backdrop-blur-xl animate-toast"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
        <iconify-icon icon="solar:check-circle-linear" className="text-xl" />
      </span>
      {toast}
    </div>
  );
}