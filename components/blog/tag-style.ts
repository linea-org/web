const TAG_DOT: Record<string, string> = {
  Replay: "bg-orange-400",
  Runtime: "bg-sky-400",
  SDK: "bg-violet-400",
  Builder: "bg-pink-400",
  Ops: "bg-emerald-400",
  Memory: "bg-amber-400",
};

const TAG_BADGE: Record<string, string> = {
  Replay: "border-orange-400/50 text-orange-400",
  Runtime: "border-sky-400/50 text-sky-400",
  SDK: "border-violet-400/50 text-violet-400",
  Builder: "border-pink-400/50 text-pink-400",
  Ops: "border-emerald-400/50 text-emerald-400",
  Memory: "border-amber-400/50 text-amber-400",
};

export function tagDot(tag: string): string {
  return TAG_DOT[tag] ?? "bg-white/40";
}

export function tagBadge(tag: string): string {
  return TAG_BADGE[tag] ?? "border-white/25 text-muted";
}
