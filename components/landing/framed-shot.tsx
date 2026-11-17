import { PlatformShot } from "@/components/media/platform-shot";

/**
 * The frosted glass pane every landing visual sits in: a faint lift, a hairline
 * border and a top-edge highlight, with no colour box behind it. Shared by the
 * screenshots, the run graph and the memory notes so the three feature rows match.
 */
export const GLASS_FRAME =
  "relative rounded-[18px] border border-white/15 bg-white/[0.06] p-1.5 shadow-[0_32px_64px_-24px_rgb(0_0_0/0.7),inset_0_1px_0_rgb(255_255_255/0.18)] sm:p-2.5";

/** The dark pane inside the glass. Add a background colour where it is used. */
export const GLASS_INNER =
  "relative overflow-hidden rounded-[12px] ring-1 ring-white/10";

export function FramedShot({
  src,
  alt,
  sizes,
  eager = false,
  /** Stretch the frame to the grid cell and keep the shot centered in it. */
  match = false,
  /**
   * From lg, fill the grid cell edge to edge: the shot is cropped from the top-left to the
   * cell's height instead of floating in a taller frame. Below lg it keeps its own ratio.
   */
  stretch = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  eager?: boolean;
  match?: boolean;
  stretch?: boolean;
  className?: string;
}) {
  if (stretch) {
    return (
      <div
        className={`lp-reveal ${GLASS_FRAME} flex flex-col lg:h-full ${className}`}
      >
        <div
          className={`${GLASS_INNER} aspect-[1627/967] w-full bg-black lg:aspect-auto lg:min-h-0 lg:flex-1`}
        >
          <div className="absolute inset-0">
            <PlatformShot
              src={src}
              alt={alt}
              sizes={sizes}
              eager={eager}
              fill
              fit="cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`lp-reveal ${GLASS_FRAME} ${match ? "flex h-full items-center" : ""} ${className}`}
    >
      <div className={`${GLASS_INNER} w-full bg-black`}>
        <PlatformShot src={src} alt={alt} sizes={sizes} eager={eager} />
      </div>
    </div>
  );
}
