import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/components/Language";
import { getSiteImages, getSiteText } from "@/lib/sanity";

export default async function Home() {
  // Fetched once here rather than in each component: Contact runs on the client
  // and could not load it itself.
  const [images, text] = await Promise.all([getSiteImages(), getSiteText()]);

  return (
    // The provider renders no element of its own, so the nav stays a direct
    // child of <main> and its sticky positioning is unaffected.
    <LanguageProvider>
      <main>
        <Hero avatar={images.avatar} background={images.heroBackground} text={text} />
        <Portfolio />
        <About
          photo={images.aboutPhoto}
          illustration={images.aboutIllustration}
          text={text}
        />
        <Contact
          illustration={images.contactImage}
          background={images.contactBackground}
        />
        <Footer />
        <BackToTop />
      </main>
    </LanguageProvider>
  );
}
