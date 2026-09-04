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
        <div className="relative aspect-[4/3] border-b border-white/12 lg:order-2 lg:aspect-auto lg:h-full lg:min-h-80 lg:border-b-0 lg:border-l">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
        <Container className="flex flex-col justify-start py-10 sm:py-14">
          <p className="text-sm text-muted">{product.name}</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
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

function Steps({ items }: { items: { title: string; copy: string }[] }) {
  return (
    <div className="mt-10 grid gap-x-16 gap-y-8 sm:grid-cols-2">
      {items.map((item, index) => (
        <div key={item.title}>
          <p className="text-sm tabular-nums text-muted">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-base font-medium tracking-tight">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
        </div>
      ))}
    </div>
  );
}

function How({
  product,
  label,
}: {
  product: Product;
  label: string;
}) {
  return (
    <Band marks={false}>
      <Container className="py-10 sm:py-14">
        <p className="text-sm text-muted">{label}</p>
        <h2 className="mt-3 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
          {product.how.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          {product.how.lead}
        </p>
        <Steps items={product.how.steps} />
      </Container>
    </Band>
  );
}

async function Example({ product }: { product: Product }) {
  return (
    <Band marks={false}>
      <Container className="py-10 sm:py-12">
        <p className="text-sm text-muted">Example</p>
        <h2 className="mt-3 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
          {product.example.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          {product.example.copy}
        </p>
      </Container>
      <CodeBlock
        code={product.example.code}
        lang={product.example.lang}
        framed={false}
      />
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
      <Container className="grid gap-10 py-10 sm:grid-cols-2 sm:gap-16 sm:py-14">
        <div>
          <p className="text-sm text-muted">{product.split.left.title}</p>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-muted">
            {product.split.left.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-muted">{product.split.right.title}</p>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-6 text-muted">
            {product.split.right.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>
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
        <Steps items={block.items} />
      </Container>
    </Band>
  );
}

function Body({ product }: { product: Product }) {
  switch (product.slug) {
    case "runtime":
      return (
        <>
          <How product={product} label="How it works" />
          <Example product={product} />
          <Compare product={product} />
          <Split product={product} />
        </>
      );
    case "replay":
      return (
        <>
          <How product={product} label="The break" />
          <Example product={product} />
          <Compare product={product} />
          <NotReplay product={product} />
        </>
      );
    case "memory":
      return (
        <>
          <Split product={product} />
          <Example product={product} />
          <How product={product} label="How it works" />
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
