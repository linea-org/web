import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { TWITTER_HANDLE } from "@/lib/socials";

const OG_SIZE = { width: 1200, height: 630 };

function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function ogImageUrl(path: string): string {
  const suffix =
    path === "/" ? "/opengraph-image" : `${path.replace(/\/$/, "")}/opengraph-image`;
  return absoluteUrl(suffix);
}

export function socialTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
}

export function pageMeta({
  title,
  description,
  path,
  type = "website",
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  index?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const image = ogImageUrl(path);
  const shareTitle = socialTitle(title);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: true },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [
        {
          url: image,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          alt: shareTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
