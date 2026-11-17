/**
 * Hero backdrop: soft colour washes sampled from the dashboard window (sky,
 * warm mid, floor) plus the brand blue, over the black page. Plain radial
 * gradients, no blur filter, so it costs one paint and no GPU layer.
 *
 * The washes sit low and wide so they spill out from behind the dashboard
 * image, not just the headline.
 */
export function HeroGlow() {
  return (
    <div
      aria-hidden
      // Reaches up behind the announcement bar (52px: 12px gap + 40px bar) and the
      // 56px sticky header, so the page top has no seam where the glow starts.
      className="pointer-events-none absolute -top-[108px] left-1/2 h-[calc(100%+108px)] w-screen -translate-x-1/2 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 46% 40% at 14% 70%, rgb(196 92 50 / 0.62), transparent 70%)",
            "radial-gradient(ellipse 44% 38% at 88% 64%, rgb(157 189 228 / 0.46), transparent 70%)",
            "radial-gradient(ellipse 38% 26% at 50% 4%, rgb(37 99 235 / 0.38), transparent 72%)",
            "radial-gradient(ellipse 52% 30% at 50% 88%, rgb(196 174 164 / 0.22), transparent 75%)",
          ].join(", "),
        }}
      />
      <div className="lp-noise absolute inset-0" style={{ opacity: 0.07 }} />
      {/* Fades into the black page below so the next band starts clean. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
