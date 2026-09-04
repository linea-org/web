import Image from "next/image";
import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
import { AUDIENCE } from "@/lib/audience";
import { PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Who it is for",
  description:
    "Linea is for founders, platform engineers, and teams who already know how they would operate an agent graph, and would rather not.",
  path: "/audience",
});

const NOT = [
  {
    title: "Not a Zapier replacement",
    copy: "If the work is a visual-only path, and a code node would mean the product failed, this is the wrong tool.",
  },
  {
    title: "Not another framework",
    copy: "If you need a new way to write the agent loop, stay on the framework you have. We host the run. We do not replace the loop.",
  },
  {
    title: "Not a customer page",
    copy: "If you need a logo wall before you try it, we do not have one. The product is early. That is the whole answer.",
  },
] as const;

export default function AudiencePage() {
  return (
    <SiteChrome>
      <main>
        <Band marks={false}>
          <Container className="py-16 sm:py-24">
            <p className="text-sm text-muted">Who it is for</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
              Built for people who already know how they would do this.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
              The builder is there if you want it. It is not the only way in.
              The SDK is a first-class authoring surface, not a lesser path.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
                Start building
              </Button>
              <Button href="/runtime" variant="secondary" shortcut="a">
                See the runtime
              </Button>
            </div>
          </Container>
        </Band>

        <Band marks={false}>
          <div className="grid gap-3 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
            {AUDIENCE.map((item, index) => (
              <article
                key={item.name}
                className="border border-white/12 px-5 py-8 sm:px-8 md:border-0"
              >
                <p className="text-sm tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <Image
                  src={item.image}
                  alt=""
                  width={40}
                  height={40}
                  className="mt-4 size-10 object-cover"
                />
                <h2 className="mt-3 text-xl font-medium tracking-tight">
                  {item.name}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {item.title} · {item.role}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </Band>

        <Band marks={false}>
          <Container className="py-10 sm:py-12">
            <p className="text-sm text-muted">Who it is not for</p>
            <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
              And who it is not for.
            </h2>
          </Container>
          <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
            {NOT.map((item) => (
              <div
                key={item.title}
                className="border border-white/12 px-5 py-8 sm:px-8 md:border-0"
              >
                <h3 className="text-base font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
              </div>
            ))}
          </div>
        </Band>
      </main>
    </SiteChrome>
  );
}
