import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import Instagram from "@/components/Instagram";
import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/components/Language";
import { ViewProvider, ViewSwitch } from "@/components/View";
import {
  getSiteHeadings,
  getSiteImages,
  getSiteText,
  logoBlob,
  logoInk,
  ribbonColour,
  aboutBandColour,
  accentColour,
  backdropUrl,
  stripeDark,
  stripeLight,
} from "@/lib/sanity";

export default async function Home() {
  // Fetched once here rather than in each component: Contact runs on the client
  // and could not load it itself.
  const [images, text, headings] = await Promise.all([
    getSiteImages(),
    getSiteText(),
    getSiteHeadings(),
  ]);

  /* Resolved once: the wordmark shows up at four sizes across the header and
     the pinned bar, and all four have to agree. */
  const brand = {
    ink: logoInk(images.logoInk),
    blob: logoBlob(images.logoBlob),
    full: images.logoFull?.url ?? null,
    mark: images.logoMark?.url ?? null,
  };

  return (
    // Neither provider renders an element of its own, so the nav stays a direct
    // child of <main> and its sticky positioning is unaffected.
    <LanguageProvider>
      <ViewProvider>
        <main style={{ "--accent": accentColour(images.accentColour) } as React.CSSProperties}>
          <SiteHeader
            brand={brand}
            stripeLight={stripeLight(images.stripeColourLight)}
            stripeDark={stripeDark(images.stripeColourDark)}
            hideStripes={images.hideStripeBar ?? false}
            ribbon={ribbonColour(images.ribbonColour)}
          />

          {/* One section at a time, picked by the link the visitor chose. All
              four are rendered on the server, so switching needs no request. */}
          <ViewSwitch
            portfolio={
              <>
                <Hero
                  avatar={images.avatar}
                  background={images.heroBackground}
                  backgroundMobile={images.heroBackgroundMobile}
                  text={text}
                  headings={headings}
                />
                <Portfolio />
              </>
            }
            about={
              <>
                <About
                  photo={images.aboutPhoto}
                  illustration={images.aboutIllustration}
                  text={text}
                  headings={headings}
                  bandColour={aboutBandColour(images.aboutBandColour)}
                  bandImage={backdropUrl(images.aboutBackground)}
                />
                <Instagram />
              </>
            }
            contact={
              <Contact
                illustration={images.contactImage}
                background={images.contactBackground}
                backgroundMobile={images.contactBackgroundMobile}
                headings={headings}
                text={text}
                buttonColourHex={images.buttonColour}
              />
            }
          />

          <Footer colour={images.footerColour} iconColour={images.socialIconColour} />
          <BackToTop />
        </main>
      </ViewProvider>
    </LanguageProvider>
  );
}
