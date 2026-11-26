import { Faq } from "@/components/landing/faq";
import { Story } from "@/components/landing/story";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, SparseMain } from "@/components/landing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import { breadcrumbGraph, faqGraph, pricingGraph } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pricing",
  description:
    "Linea is free during early access. Transparent usage-based pricing is coming soon.",
  path: "/pricing",
});

/* Both answers restate what this page and the homepage already say; no plan or price is promised here. */
const PRICING_FAQ = [
  {
    q: "Is Linea free?",
    a: "Yes. Linea is free to use during early access.",
  },
  {
    q: "What will Linea cost?",
    a: "Usage-based pricing is planned. We will publish clear pricing before introducing paid plans.",
  },
] as const;

export default function PricingPage() {
  return (
    <SiteChrome cta={false}>
      <JsonLd data={pricingGraph()} />
      <JsonLd data={faqGraph(PRICING_FAQ)} />
      <JsonLd
        data={breadcrumbGraph([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <SparseMain title="Simple pricing is on the way.">
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
          Linea is free to use during early access. We will publish clear,
          usage-based pricing before introducing paid plans.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
            Start building
          </Button>
          <Button href={DOCS_URL} variant="secondary" shortcut="d">
            Read the docs
          </Button>
        </div>
      </SparseMain>
      <Faq items={PRICING_FAQ} title="Pricing, answered." align="center" />
      <Story />
    </SiteChrome>
  );
}
