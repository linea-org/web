import { Blog } from "@/components/landing/blog";
import { Close } from "@/components/landing/close";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Separator } from "@/components/landing/frame";
import { Hero } from "@/components/landing/hero";
import { Proof } from "@/components/landing/proof";
import { SiteChrome } from "@/components/landing/site-chrome";
import { JsonLd } from "@/components/seo/json-ld";
import { faqGraph } from "@/lib/schema";

export default function Home() {
  return (
    <SiteChrome cta={false} rule={false}>
      <JsonLd data={faqGraph()} />
      <main>
        <Hero />
        <Features />
        <Separator />
        <Proof />
        <Separator />
        <Blog />
        <Faq />
        <Close />
      </main>
    </SiteChrome>
  );
}
