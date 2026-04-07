"use client";

export function NewBackgroundPill() {
  return (
    <div className="group inline-flex items-center gap-2 rounded-full border border-[#2a5f56] bg-[linear-gradient(180deg,rgba(15,32,29,0.96)_0%,rgba(8,19,17,0.96)_100%)] px-4 py-2 text-sm font-semibold text-[#eefaf7] shadow-[0_10px_30px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(178,255,237,0.08)] ring-1 ring-[#0b1e1a]/80 transition-transform duration-200 group-hover:-translate-y-0.5">
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#335f57] bg-[radial-gradient(circle_at_30%_30%,rgba(58,112,103,0.95),rgba(15,28,26,1))] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
        <span className="relative block h-3 w-3">
          <span className="absolute left-0.5 top-0 h-full w-px -rotate-[28deg] rounded-full bg-[#d9fff5]" />
          <span className="absolute left-1.5 top-0 h-full w-px -rotate-[28deg] rounded-full bg-[#d9fff5]" />
          <span className="absolute left-2.5 top-0 h-full w-px -rotate-[28deg] rounded-full bg-[#d9fff5]" />
        </span>
      </span>
      <span className="tracking-tight">IT FEST</span>
    </div>
  );
}
