"use client";

import Image from "next/image";
import { useState } from "react";
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
  priority = false,
  sizes,
  fill = false,
  tone = "neutral",
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  tone?: ShotTone;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`lp-grain lp-shot ${TONE_CLASS[tone]} ${fill ? "absolute inset-0" : "relative"} ${className}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={src}
          alt={alt}
          width={SHOT_SIZE.width}
          height={SHOT_SIZE.height}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={`${
            fill
              ? "max-h-full w-auto max-w-full object-contain"
              : "h-auto w-full"
          } transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}
