import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/components/Language";
import { ViewProvider, ViewSwitch } from "@/components/View";
import { getSiteImages, getSiteText } from "@/lib/sanity";

export default async function Home() {
  // Fetched once here rather than in each component: Contact runs on the client
  // and could not load it itself.
  const [images, text] = await Promise.all([getSiteImages(), getSiteText()]);

  return (
    // Neither provider renders an element of its own, so the nav stays a direct
    // child of <main> and its sticky positioning is unaffected.
    <LanguageProvider>
      <ViewProvider>
        <main>
          <SiteHeader />

          {/* One section at a time, picked by the link the visitor chose. All
              four are rendered on the server, so switching needs no request. */}
          <ViewSwitch
            home={
              <Hero avatar={images.avatar} background={images.heroBackground} text={text} />
            }
            portfolio={<Portfolio />}
            about={
              <About
                photo={images.aboutPhoto}
                illustration={images.aboutIllustration}
                text={text}
              />
            }
            contact={
              <Contact
                illustration={images.contactImage}
                background={images.contactBackground}
              />
            }
          />

          <Footer />
          <BackToTop />
        </main>
      </ViewProvider>
    </LanguageProvider>
  );
}
