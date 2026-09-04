import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, SparseMain } from "@/components/landing/ui";
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
      <SparseMain marks>
        <h1 className="max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
          No open roles yet.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
          Linea Labs is small on purpose. We post a role when there is
          work for another person. Until then, start with the product.
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
