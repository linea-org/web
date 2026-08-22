import { Blog } from "@/components/landing/blog";
import { Close } from "@/components/landing/close";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Separator } from "@/components/landing/frame";
import { Hero } from "@/components/landing/hero";
import { Proof } from "@/components/landing/proof";
import { SiteChrome } from "@/components/landing/site-chrome";

export default function Home() {
  return (
    <SiteChrome cta={false} rule={false}>
      <main>
        <Hero />
        <Features />
        <Separator marks={false} />
        <Proof />
        <Separator marks={false} />
        <Blog />
        <Faq />
        <Close />
      </main>
    </SiteChrome>
  );
}
