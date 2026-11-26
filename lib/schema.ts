import { FAQS } from "@/lib/faq";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import {
  DISCORD_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  TWITTER_URL,
} from "@/lib/socials";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;
const LOGO = `${SITE_URL}/linea.svg`;

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Linea Labs",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: LOGO,
        },
        sameAs: [TWITTER_URL, LINKEDIN_URL, GITHUB_URL, DISCORD_URL],
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "SoftwareApplication",
        "@id": APP_ID,
        name: SITE_NAME,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: { "@id": ORG_ID },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  };
}

export function faqGraph(items: readonly { q: string; a: string }[] = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function articleGraph({
  title,
  description,
  path,
  date,
  modified,
  author,
  image,
}: {
  title: string;
  description: string;
  path: string;
  date: string;
  modified: string;
  author: string;
  image: string;
}) {
  const url = new URL(path, SITE_URL).toString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: modified,
    url,
    mainEntityOfPage: url,
    image,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@id": ORG_ID,
      "@type": "Organization",
      name: "Linea Labs",
      logo: {
        "@type": "ImageObject",
        url: LOGO,
      },
    },
  };
}

/** Breadcrumb trail for a page, first item first. The last item is the page itself. */
export function breadcrumbGraph(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

/** The pricing page's offer: free during early access, nothing else is promised. */
export function pricingGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      name: "Early access",
      description: "Free to use during early access.",
      price: "0",
      priceCurrency: "USD",
      url: new URL("/pricing", SITE_URL).toString(),
    },
  };
}
