import React from "react";

export default function FeaturePill({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="group flex cursor-default items-center gap-4">
      <div className="cut-sm flex h-11 w-11 shrink-0 items-center justify-center bg-orange-50 text-orange-500 shadow-ring transition-transform duration-300 group-hover:scale-110">
        <iconify-icon icon={icon} className="text-xl" />
      </div>
      <div>
        <h3 className="text-sm font-normal text-gray-950">{title}</h3>
        <p className="mt-0.5 text-xs text-gray-500">{text}</p>
      </div>
    </div>
  );
}