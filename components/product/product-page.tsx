import Image from "next/image";
import { CodeBlock } from "@/components/product/code-block";
import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import type { Product } from "@/lib/product";

function Header({ product }: { product: Product }) {
  return (
    <Band marks={false}>
      <div className="grid lg:grid-cols-2">
        <div className="lp-hatch border-b border-white/12 p-1.5 lg:order-2 lg:border-b-0 lg:border-l">
          <div className="relative aspect-[4/3] overflow-hidden border border-white/12 lg:aspect-auto lg:min-h-80 lg:h-full">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
        <Container className="flex flex-col justify-center py-10 sm:py-14">
          <p className="text-sm text-muted">{product.name}</p>
          <h1 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            {product.excerpt}
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
      </div>
    </Band>
  );
}

function HowSplit({ product }: { product: Product }) {
  return (
    <Band marks={false}>
      <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-white/12">
        <Container className="flex flex-col justify-center py-10 sm:py-14">
          <p className="text-sm text-muted">How it works</p>
          <h2 className="mt-3 max-w-md text-2xl font-medium tracking-tight sm:text-3xl">
            {product.how.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            {product.how.lead}
          </p>
        </Container>
        <div className="border-t border-white/12 lg:border-t-0">
          {product.how.steps.map((step, index) => (
            <div
              key={step.title}
              className="border-b border-white/12 px-5 py-7 last:border-b-0 sm:px-8"
            >
              <p className="text-sm tabular-nums text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </Band>
  );
}

function HowStory({ product }: { product: Product }) {
  return (
    <Band marks={false}>
      <Container className="py-10 sm:py-12">
        <p className="text-sm text-muted">The break</p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
          {product.how.title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          {product.how.lead}
        </p>
      </Container>
      <div className="grid gap-3 border-t border-white/12 p-3 sm:grid-cols-2 sm:gap-0 sm:p-0">
        {product.how.steps.map((step, index) => (
          <div
            key={step.title}
            className="border border-white/12 px-5 py-7 sm:border-x-0 sm:border-t-0 sm:px-8 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
          >
            <p className="text-sm tabular-nums text-muted">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-base font-medium tracking-tight">
              {step.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-muted">{step.copy}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

function HowColumns({ product }: { product: Product }) {
  return (
    <Band marks={false}>
      <Container className="py-10 sm:py-12">
        <p className="text-sm text-muted">How it works</p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
          {product.how.title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          {product.how.lead}
        </p>
      </Container>
      <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
        {product.how.steps.map((step, index) => (
          <div
            key={step.title}
            className="border border-white/12 px-5 py-7 sm:px-8 md:border-0"
          >
            <p className="text-sm tabular-nums text-muted">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-base font-medium tracking-tight">
              {step.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-muted">{step.copy}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

async function Example({
  product,
  codeFirst = false,
}: {
  product: Product;
  codeFirst?: boolean;
}) {
  const copy = (
    <Container className="flex flex-col justify-center py-10 sm:py-14">
      <p className="text-sm text-muted">Example</p>
      <h2 className="mt-3 max-w-md text-2xl font-medium tracking-tight sm:text-3xl">
        {product.example.title}
      </h2>
      <p className="mt-4 max-w-md text-sm leading-6 text-muted">
        {product.example.copy}
      </p>
    </Container>
  );

  const code = (
    <div
      className={`lp-hatch p-1.5 ${codeFirst ? "border-b border-white/12 lg:border-r lg:border-b-0" : "border-t border-white/12 lg:border-t-0"}`}
    >
      <CodeBlock code={product.example.code} lang={product.example.lang} />
    </div>
  );

  return (
    <Band marks={false}>
      <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-white/12">
        {codeFirst ? (
          <>
            {code}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {code}
          </>
        )}
      </div>
    </Band>
  );
}

function Compare({ product }: { product: Product }) {
  return (
    <Band marks={false}>
      <Container className="py-10 sm:py-12">
        <p className="text-sm text-muted">Compare</p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
          {product.compare.title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          {product.compare.lead}
        </p>
      </Container>
      <div className="overflow-x-auto border-t border-white/12">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.04]">
            <tr>
              <th className="px-5 py-3 font-medium sm:px-8"> </th>
              <th className="px-5 py-3 font-medium sm:px-8">
                {product.compare.columns[0]}
              </th>
              <th className="px-5 py-3 font-medium sm:px-8">
                {product.compare.columns[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {product.compare.rows.map((row) => (
              <tr key={row.label} className="border-t border-white/12">
                <th className="px-5 py-3 font-medium sm:px-8">{row.label}</th>
                <td className="px-5 py-3 text-muted sm:px-8">{row.left}</td>
                <td className="px-5 py-3 text-muted sm:px-8">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Band>
  );
}

function Split({ product }: { product: Product }) {
  return (
    <Band marks={false}>
      <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-white/12">
        <div className="border-b border-white/12 px-5 py-10 sm:border-b-0 sm:px-8 sm:py-14">
          <p className="text-sm text-muted">{product.split.left.title}</p>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-muted">
            {product.split.left.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="px-5 py-10 sm:px-8 sm:py-14">
          <p className="text-sm text-muted">{product.split.right.title}</p>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-muted">
            {product.split.right.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Band>
  );
}

function NotReplay({ product }: { product: Product }) {
  const block = product.not;
  if (!block) {
    return null;
  }

  return (
    <Band marks={false}>
      <Container className="py-10 sm:py-12">
        <p className="text-sm text-muted">Not this</p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
          {block.title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{block.lead}</p>
      </Container>
      <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
        {block.items.map((item) => (
          <div
            key={item.title}
            className="border border-white/12 px-5 py-7 sm:px-8 md:border-0"
          >
            <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">{item.copy}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

function Body({ product }: { product: Product }) {
  switch (product.slug) {
    case "runtime":
      return (
        <>
          <HowSplit product={product} />
          <Example product={product} />
          <Compare product={product} />
          <Split product={product} />
        </>
      );
    case "replay":
      return (
        <>
          <HowStory product={product} />
          <Example product={product} />
          <Compare product={product} />
          <NotReplay product={product} />
        </>
      );
    case "memory":
      return (
        <>
          <Split product={product} />
          <Example product={product} codeFirst />
          <HowColumns product={product} />
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
