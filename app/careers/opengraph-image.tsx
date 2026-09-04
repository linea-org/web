import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Careers · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Careers",
    title: "No open roles yet.",
    description: "Linea Labs is early. There are no open roles posted yet.",
  });
}
