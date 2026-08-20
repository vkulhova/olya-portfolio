import Image from "next/image";
import LocalisedText from "./LocalisedText";
import LocalisedHeading from "./LocalisedHeading";
import AboutCopyFit from "./AboutCopyFit";
import type { SiteHeadings, SiteImage, SiteText } from "@/lib/sanity";

/** Used until the Studio field is filled in. Blank lines split the paragraphs. */
const DEFAULT_ABOUT_EN = `My name is Olika Nikolska, and I’ve been drawing for as long as I can remember. I’m a Ukrainian illustrator based in Odesa, and these days that looks like freelance illustration across books, stickers, portraits, and brand work, with four years at a mobile game studio somewhere along the way.

Outside of work, I’m a matcha and cocoa person with a real weakness for tiramisu and anything with cinnamon or strawberry. I have a soft spot for collectible figures and building kits that are already making my shelves groan. I still draw by hand in paper sketchbooks too. In the evenings, I might read some fantasy or something about illustration, watch a series, check out YouTube, or just get lost in my feed. Home is the only place where I can truly exhale, which is probably why I do my best work right here.

Living in Odesa means life comes with surprises, not always pleasant ones. But believing in better days and good endings is what keeps me going and gives me the energy to create.`;

export default function About({
  photo,
  illustration,
  text,
  headings,
}: {
  photo: SiteImage;
  illustration: SiteImage;
  text?: SiteText;
  headings?: SiteHeadings;
}) {
  return (
    <section id="about" className="w-full bg-white scroll-mt-[78px]">
      {/* The dot ribbon above lives in SiteHeader now, and brings 32px of white
          with it — hence 72 here rather than the 104 this used to carry. On
          phones that still left the photo further from the ribbon than the
          other two sections start, so there it is 32. */}
      <div className="w-[78%] mx-auto pt-8 sm:pt-[72px] pb-10">
        {/* Photo + text grid */}
        {/* Between md and lg the photo takes a wider share: it is the taller
            column there, and giving it room is what lets the copy stay beside
            it at a readable size instead of stacking. From lg up the split is
            the original 3:7. */}
        <div
          data-about-grid
          className="grid grid-cols-1 md:grid-cols-[4fr_6fr] lg:grid-cols-[3fr_7fr] gap-x-10 gap-y-16 md:gap-y-10 items-stretch mb-4 sm:mb-10"
        >

          {/* Photo column. The box carries the photo's own 3:4 ratio at every
              width, so it is exactly the picture — nothing is cropped and no
              letterboxing is left for the stars to float in. Keeping the text
              inside this height is the copy's job, not the photo's: see the
              fluid size on .about-copy. */}
          <div>
            {/* data-about-photo is what AboutCopyFit measures the copy against. */}
            <div
              data-about-photo
              className="relative w-full max-w-[200px] sm:max-w-[272px] md:max-w-[300px] mx-auto aspect-[3/4]"
            >
              {/* Gold star — top-left, overlapping photo corner. The lg offsets
                  sit 10px further out because the old box was that much wider
                  than the picture; desktop is meant to look exactly as before.
                  On phones the size alone keeps it off the hat: at 72px in the
                  same -40px position it reaches 32px onto the picture, all of
                  it sky. Moving it out as well left the star's body short of
                  the photo with only a ray tip bridging the white between.
                  Still well clear of the salmon star's 59px, which is meant to
                  stay the smaller of the two. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/star-gold.svg"
                alt=""
                aria-hidden="true"
                className="absolute top-[14px] -left-10 w-[72px] h-[72px] sm:-top-10 sm:w-[85px] sm:h-[85px] md:-left-[50px] z-10 pointer-events-none"
              />
              {/* Photo */}
              <Image
                src={photo?.url ?? "/images/photo-olya.jpg"}
                alt="Olika Nikolska"
                fill
                sizes="(max-width: 768px) 272px, 300px"
                className="object-cover object-top"
              />
              {/* Salmon star — bottom-left, overlapping photo corner */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/star-salmon.svg"
                alt=""
                aria-hidden="true"
                className="absolute -bottom-9 left-4 md:left-[6px] w-[59px] h-[59px] z-10 pointer-events-none"
              />
            </div>
          </div>

          {/* Text column — stretches to photo height; AboutCopyFit keeps the
              copy inside it. */}
          <div className="flex flex-col gap-5 pt-2">
            {/* Heading. The olive star that used to sit beside it is gone —
                the two gold and salmon ones on the photo are the section's
                punctuation, and a third on the same screen was one mark too
                many. Both languages lose it. */}
            {/* Centred while the columns are stacked, so the heading lines up
                with the photo above it; beside the photo it stays left. */}
            <div className="flex items-center justify-center md:justify-start">
              <LocalisedHeading
                en={headings?.aboutEn ?? "/svg/a-few-words-about-me.svg"}
                uk={headings?.aboutUk ?? "/svg/a-few-words-about-me-uk.svg"}
                altEn="A few words about me"
                altUk="Кілька слів про мене"
                className="h-[34px] sm:h-[44px] w-auto min-w-0 shrink"
                ukClassName="h-[50px] sm:h-[64px] w-auto min-w-0 shrink"
              />
            </div>

            <AboutCopyFit>
              <LocalisedText
                en={text?.aboutEn?.trim() || DEFAULT_ABOUT_EN}
                uk={text?.aboutUk ?? null}
                className="about-copy font-outfit font-light leading-[1.7] text-dark text-justify"
              />
            </AboutCopyFit>
          </div>
        </div>

      </div>

      {/* Desk illustration — 60% page width, outside the narrow container */}
      {/* The picture file carries empty margins on all four sides — the drawing
          itself is only about two thirds of its width, and roughly a twentieth
          of its height is blank above and below. On phones it is scaled up and
          the empty sides run off the edge, so the desk fills the screen; the
          negative top and bottom margins pull the blank bands out of the flow
          the same way, and overflow is clipped here so neither shows and the
          page never scrolls sideways. Those margins are percentages, which
          resolve against this box's width — the same thing the image's own
          height follows — so the crop holds at every phone size. Wide screens
          keep the picture whole. */}
      {/* pb-16 on phones, not the 6 it had. The negative bottom margin below
          crops the drawing's blank band by very nearly the whole 24px that
          padding gave, so the desk was finishing about 2px above the beige and
          the two blocks touched. 64px here leaves roughly the 45 the mark on
          the card asks for. Wide screens keep their 40. */}
      <div className="w-full sm:w-[60%] mx-auto pb-16 sm:pb-10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={illustration?.url ?? "/images/illustration.png"}
          alt="Cozy desk illustration"
          className="w-[130%] max-w-none -ml-[15%] -mt-[4.3%] -mb-[5.8%] sm:w-full sm:ml-0 sm:mt-0 sm:mb-0 h-auto"
        />
      </div>
    </section>
  );
}
