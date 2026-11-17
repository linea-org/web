import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, SparseMain } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Careers",
  description: "Learn about careers and future opportunities at Linea Labs.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <SiteChrome cta={false}>
      <SparseMain title="We are building the first team.">
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
          There are no open roles today. As Linea grows, we will post new
          opportunities here with clear ownership, scope, and expectations.
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
