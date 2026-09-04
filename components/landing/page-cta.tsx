import { Band } from "@/components/landing/frame";
import { Button, Container } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";

export function PageCta() {
  return (
    <Band marks={false}>
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
        <h2 className="max-w-lg text-2xl font-medium tracking-tight sm:text-3xl">
          You write the logic that is unique.
          <br />
          We run everything that is not.
        </h2>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button href={DOCS_URL} variant="secondary" shortcut="d">
            Read the docs
          </Button>
          <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
            Start building
          </Button>
        </div>
      </Container>
    </Band>
  );
}
