import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, SparseMain } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pricing",
  description:
    "Linea is free during early access. Transparent usage-based pricing is coming soon.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <SiteChrome cta={false}>
      <SparseMain>
        <h1 className="max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
          Simple pricing is on the way.
        </h1>
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
    </SiteChrome>
  );
}
