import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/components/Language";

export default function Home() {
  return (
    // The provider renders no element of its own, so the nav stays a direct
    // child of <main> and its sticky positioning is unaffected.
    <LanguageProvider>
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Contact />
        <Footer />
        <BackToTop />
      </main>
    </LanguageProvider>
  );
}
