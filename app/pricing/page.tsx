import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, SparseMain } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pricing",
  description:
    "Linea pricing is coming soon. We will price usage when the bill is real.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <SiteChrome>
      <SparseMain>
        <h1 className="max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
          No prices yet.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
          The product is free while we build. When usage has a real bill,
          the numbers go here. No invented tiers in the meantime.
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
