const TAG_DOT: Record<string, string> = {
  Replay: "bg-orange-400",
  Runtime: "bg-sky-400",
  SDK: "bg-violet-400",
  Builder: "bg-pink-400",
  Ops: "bg-emerald-400",
  Memory: "bg-amber-400",
};

const TAG_BADGE: Record<string, string> = {
  Replay: "border-orange-400/40 text-orange-400",
  Runtime: "border-sky-400/40 text-sky-400",
  SDK: "border-violet-400/40 text-violet-400",
  Builder: "border-pink-400/40 text-pink-400",
  Ops: "border-emerald-400/40 text-emerald-400",
  Memory: "border-amber-400/40 text-amber-400",
};

export function tagDot(tag: string): string {
  return TAG_DOT[tag] ?? "bg-white/40";
}

export function tagBadge(tag: string): string {
  return TAG_BADGE[tag] ?? "border-white/25 text-muted";
}

/** Rounded tag pill; pair with `tagBadge` for the colour. */
export const TAG_PILL =
  "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] leading-4 font-medium tracking-tight";
