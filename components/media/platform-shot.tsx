import { getImageProps } from "next/image";
import { SHOT_SIZE } from "@/lib/shots";

export type ShotTone = "neutral" | "warm" | "cool";

const TONE_CLASS: Record<ShotTone, string> = {
  neutral: "",
  warm: "lp-shot-warm",
  cool: "lp-shot-cool",
};

export function PlatformShot({
  src,
  alt,
  eager = false,
  sizes,
  fill = false,
  fit = "contain",
  tone = "neutral",
  className = "",
}: {
  src: string;
  alt: string;
  eager?: boolean;
  sizes?: string;
  fill?: boolean;
  /** With `fill`: letterbox the whole shot, or crop it to cover the frame from the top-left. */
  fit?: "contain" | "cover";
  tone?: ShotTone;
  className?: string;
}) {
  const { props } = getImageProps({
    src,
    alt,
    width: SHOT_SIZE.width,
    height: SHOT_SIZE.height,
    sizes,
    quality: 70,
    loading: eager ? "eager" : "lazy",
    fetchPriority: eager ? "high" : undefined,
  });
  const { alt: imageAlt, ...imageProps } = props;

  return (
    <div
      // `.lp-grain` sets position: relative (for its ::after), which beat `absolute inset-0`;
      // fill by size instead, so the shot really covers its frame.
      className={`lp-grain lp-shot ${TONE_CLASS[tone]} ${fill ? "h-full w-full" : ""} ${className}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        {/* getImageProps keeps responsive optimization without client state. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...imageProps}
          alt={imageAlt}
          className={
            !fill
              ? "h-auto w-full"
              : fit === "cover"
                ? "h-full w-full object-cover object-left-top"
                : "max-h-full w-auto max-w-full object-contain"
          }
        />
      </div>
    </div>
  );
}
