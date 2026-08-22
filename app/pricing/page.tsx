import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
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
      <main>
        <Band marks={false}>
          <Container className="py-16 sm:py-24">
            <p className="text-sm text-muted">Pricing</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
              Coming soon.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
              No seat math and no fake tiers. We will publish pricing when
              usage has a real bill. Until then the product stays free while
              we build.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
                Start building
              </Button>
              <Button href={DOCS_URL} variant="secondary" shortcut="d">
                Read the docs
              </Button>
            </div>
          </Container>
        </Band>
      </main>
    </SiteChrome>
  );
}
