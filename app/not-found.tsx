import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, SparseMain } from "@/components/landing/ui";

export default function NotFound() {
  return (
    <SiteChrome cta={false}>
      <SparseMain>
        <h1 className="max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
          This page is not here.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
          The URL moved, or it never existed. Everything else on the
          site is still there.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" shortcut="h" externalIcon={false}>
            Back home
          </Button>
          <Button href="/blog" variant="secondary" shortcut="b">
            Read the blog
          </Button>
        </div>
      </SparseMain>
    </SiteChrome>
  );
}
