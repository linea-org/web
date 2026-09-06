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
  tone = "neutral",
  className = "",
}: {
  src: string;
  alt: string;
  eager?: boolean;
  sizes?: string;
  fill?: boolean;
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
      className={`lp-grain lp-shot ${TONE_CLASS[tone]} ${fill ? "absolute inset-0" : "relative"} ${className}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        {/* getImageProps keeps responsive optimization without client state. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...imageProps}
          alt={imageAlt}
          className={`${
            fill
              ? "max-h-full w-auto max-w-full object-contain"
              : "h-auto w-full"
          }`}
        />
      </div>
    </div>
  );
}
