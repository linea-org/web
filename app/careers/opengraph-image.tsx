import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Careers · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Careers",
    title: "We are building the first team.",
    description: "Learn about careers and future opportunities at Linea Labs.",
  });
}
