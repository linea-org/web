import Image from "next/image";

export function Cat({
  className = "",
  sizes = "12rem",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/linea-cat.png"
      alt=""
      width={549}
      height={720}
      sizes={sizes}
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      className={`pointer-events-none h-auto select-none ${className}`}
    />
  );
}
