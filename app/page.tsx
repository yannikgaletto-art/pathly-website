import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { ComparisonToggle } from "@/components/sections/ComparisonToggle";
import { Features } from "@/components/sections/Features";
import { Differentiation } from "@/components/sections/Differentiation";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollSection>
          <Hero />
          <Problem />
        </ScrollSection>
        <ComparisonToggle />
        <Features />
        <Differentiation />
        <Testimonials />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
