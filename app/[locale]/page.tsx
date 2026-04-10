import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { ComparisonToggle } from "@/components/sections/ComparisonToggle";
import { Features } from "@/components/sections/Features";
import { Differentiation } from "@/components/sections/Differentiation";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { BrowserExtension } from "@/components/sections/BrowserExtension";
import { FAQSection } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

const SHOW_PRICING = process.env.NEXT_PUBLIC_SHOW_PRICING === 'true';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollSection>
          <Hero />
          <Problem />
          <ComparisonToggle />
        </ScrollSection>
        <Features />
        <Differentiation />
        <Testimonials />
        {SHOW_PRICING ? <Pricing /> : <FinalCTA />}
        <BrowserExtension />
        <FAQSection />
        {SHOW_PRICING && <FinalCTA />}
      </main>
      <Footer />
    </>
  );
}


