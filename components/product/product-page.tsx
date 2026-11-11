import { CodeBlock } from "@/components/product/code-block";
import { FramedShot } from "@/components/landing/framed-shot";
import {
  CARD,
  CARD_PAD,
  CheckList,
  PageHero,
  Section,
  SectionHeading,
  StepCards,
} from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, HEADING_GAP } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import type { Product } from "@/lib/product";

function Header({ product }: { product: Product }) {
  return (
    <PageHero
      eyebrow={product.name}
      title={product.title}
      lead={product.excerpt}
      actions={
        <>
          <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
            Start building
          </Button>
          <Button href={DOCS_URL} variant="secondary" shortcut="d">
            Read the docs
          </Button>
        </>
      }
    >
      <FramedShot
        src={product.image}
        alt={product.imageAlt}
        eager
        sizes="(min-width: 80rem) 80rem, 100vw"
      />
    </PageHero>
  );
}

function How({ product }: { product: Product }) {
  return (
    <Section id="how">
      <SectionHeading
        eyebrow="How it works"
        title={product.how.title}
        lead={product.how.lead}
      />
      <div className={HEADING_GAP}>
        <StepCards items={product.how.steps} />
      </div>
    </Section>
  );
}

async function Example({ product }: { product: Product }) {
  return (
    <Section id="example">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="Example"
          title={product.example.title}
          lead={product.example.copy}
        />
        <CodeBlock code={product.example.code} lang={product.example.lang} />
      </div>
    </Section>
  );
}

function Compare({ product }: { product: Product }) {
  return (
    <Section id="compare">
      <SectionHeading
        eyebrow="Compare"
        title={product.compare.title}
        lead={product.compare.lead}
      />
      <div className={`${HEADING_GAP} ${CARD} overflow-x-auto`}>
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="w-1/4 px-5 py-4 font-medium sm:px-6">
                <span className="sr-only">Aspect</span>
              </th>
              <th className="px-5 py-4 font-medium text-muted sm:px-6">
                {product.compare.columns[0]}
              </th>
              <th className="px-5 py-4 font-medium text-[#9dbde4] sm:px-6">
                {product.compare.columns[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {product.compare.rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-white/10 last:border-b-0"
              >
                <th className="px-5 py-4 font-medium sm:px-6">{row.label}</th>
                <td className="px-5 py-4 text-muted sm:px-6">{row.left}</td>
                <td className="px-5 py-4 sm:px-6">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function Split({ product }: { product: Product }) {
  const { left, right } = product.split;

  return (
    <Section id="split">
      <SectionHeading
        eyebrow="Who does what"
        title="You keep the logic. Linea keeps the host."
      />
      <div className={`${HEADING_GAP} grid gap-3 md:grid-cols-2`}>
        <div className={`${CARD} ${CARD_PAD}`}>
          <p className="text-sm font-medium tracking-tight text-muted">
            {left.title}
          </p>
          <ul className="mt-5 space-y-3">
            {left.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-5 text-muted"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/30"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`rounded-[10px] border border-[#9dbde4]/25 bg-[#9dbde4]/[0.06] ${CARD_PAD}`}
        >
          <p className="text-sm font-medium tracking-tight text-[#9dbde4]">
            {right.title}
          </p>
          <CheckList items={right.items} className="mt-5" />
        </div>
      </div>
    </Section>
  );
}

function Precision({ product }: { product: Product }) {
  const block = product.not;
  if (!block) {
    return null;
  }

  return (
    <Section id="precision">
      <SectionHeading
        eyebrow="Designed for precision"
        title={block.title}
        lead={block.lead}
      />
      <div className={HEADING_GAP}>
        <StepCards items={block.items} />
      </div>
    </Section>
  );
}

function Body({ product }: { product: Product }) {
  switch (product.slug) {
    case "runtime":
      return (
        <>
          <How product={product} />
          <Example product={product} />
          <Compare product={product} />
          <Split product={product} />
        </>
      );
    case "replay":
      return (
        <>
          <How product={product} />
          <Example product={product} />
          <Compare product={product} />
          <Precision product={product} />
        </>
      );
    case "memory":
      return (
        <>
          <Split product={product} />
          <Example product={product} />
          <How product={product} />
          <Compare product={product} />
        </>
      );
    default: {
      const _never: never = product.slug;
      return _never;
    }
  }
}

export async function ProductPage({ product }: { product: Product }) {
  return (
    <SiteChrome>
      <main>
        <Header product={product} />
        <Body product={product} />
      </main>
    </SiteChrome>
  );
}
