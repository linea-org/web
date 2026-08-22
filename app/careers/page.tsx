import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Careers",
  description: "Linea Labs is early. There are no open roles posted yet.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <SiteChrome>
      <main>
        <Band>
          <Container className="py-16 sm:py-24">
            <p className="text-sm text-muted">Careers</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
              No open roles yet.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Linea Labs is small and the product is early. We will post roles
              here when there is real work to hire for, not a ghost list.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
              If you want to help build the hosted half of the agent stack,
              start with the product and the docs.
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
