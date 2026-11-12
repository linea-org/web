import { PlatformShot } from "@/components/media/platform-shot";

/** Product screenshot sitting on the sky-to-floor gradient, like the hero window. */
export function FramedShot({
  src,
  alt,
  sizes,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`lp-reveal relative overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,var(--stage-sky)_0%,var(--stage-mist)_55%,var(--stage-floor)_100%)] p-4 sm:p-8 lg:p-10 ${className}`}
    >
      <div aria-hidden className="lp-noise absolute inset-0" />
      <div className="relative overflow-hidden rounded-[10px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/20">
        <PlatformShot src={src} alt={alt} sizes={sizes} eager={eager} />
      </div>
    </div>
  );
}
