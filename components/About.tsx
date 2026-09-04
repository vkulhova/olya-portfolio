import Image from "next/image";
import LocalisedText from "./LocalisedText";
import LocalisedHeading from "./LocalisedHeading";
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
  bandColour,
  bandImage,
}: {
  photo: SiteImage;
  illustration: SiteImage;
  text?: SiteText;
  headings?: SiteHeadings;
  bandColour?: string;
  bandImage?: string | null;
}) {
  return (
    <section id="about" className="w-full bg-white scroll-mt-[78px]">
      {/* Coloured band, desktop only. Studio can put a picture here instead of
          the colour; both arrive as variables because .about-band has to hold
          them behind a media query. */}
      <div
        className="about-band sm:py-[13.1%]"
        style={
          {
            ...(bandColour ? { "--about-band": bandColour } : null),
            ...(bandImage ? { "--about-band-image": `url(${bandImage})` } : null),
          } as React.CSSProperties
        }
      >
      {/* The dot ribbon above lives in SiteHeader now, and brings 32px of white
          with it — hence 72 here rather than the 104 this used to carry. On
          phones that still left the photo further from the ribbon than the
          other two sections start, so there it is 32. */}
      {/* 72% of the window, centred, capped at the 1216px the drawing on card
          #55 shows. Past that width the card would be an extrapolation of the
          drawing rather than the drawing: the copy sets in fewer and fewer
          lines as the measure grows while the photo only gets taller, so the
          two stop meeting. Freezing the card at the width it was drawn at
          keeps the whole block in the proportions that were approved. */}
      <div className="w-[90%] sm:w-[72%] sm:max-w-[1216px] mx-auto pt-8 sm:pt-0 pb-10 sm:pb-0">
        {/* White card, desktop only — 6px corners, as the design asks. On
            phones the photo and the copy sit straight on the page. */}
        <div className="sm:bg-white sm:rounded-[6px] sm:px-14 sm:py-12">
        {/* Photo and copy. Not a grid: in two columns the copy had nowhere to
            go once it outgrew the picture, so it piled up in its own narrow
            half and hung far below the photo on middle-sized screens. The
            picture is floated instead, so the copy sets beside it and then
            carries on underneath at the full width of the section — the text
            moves sideways as the window narrows rather than downwards.

            Below md there is no float: the picture is a centred block with the
            copy under it, exactly as before. */}
        <div className="mb-4 sm:mb-10">

          {/* The box carries the photo's own 3:4 ratio at every width, so it is
              exactly the picture — nothing is cropped and no letterboxing is
              left for the stars to float in. mb-16 on phones is the 64px the
              grid's row gap used to give it; the salmon star hangs 36px below
              the frame and needs the room.

From md up the picture is 31.6% of the card's inner width —
              the 28% of its outer width the drawing shows, once the card's own
              padding is taken off — and carries the drawing's own 340:481, which is what card #55 measures: the photo
              runs from the top of the drawn phrase to the last line of the
              copy. It is a proportion rather than a pixel width so that the
              two keep meeting as the window changes — an exact height would
              hold at one width and nowhere else, and would go stale the moment
              the text is edited in Studio. */}
          <div>
            <div
              className="relative w-full max-w-[200px] sm:max-w-[272px] md:w-[31.6%] md:max-w-none mx-auto mb-16 md:mx-0 md:mb-10 md:mr-10 md:float-left aspect-[3/4] md:aspect-[340/481]"
            >
              {/* Photo */}
              <Image
                src={photo?.url ?? "/images/photo-olya.jpg"}
                alt="Olika Nikolska"
                fill
                sizes="(max-width: 768px) 272px, 300px"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* No column any more — the heading and the copy are ordinary blocks
              in the flow beside the float. The heading is a flex box, which
              keeps clear of the picture as a whole; the copy is a plain block,
              which is the only kind whose lines wrap around a float and then
              close up underneath it. */}
          {/* pt-2 gives the phrase a little air on phones, where it sits under
              the photo. Beside the photo it has to start level with it, which
              is what the card asks for, so from md up the padding goes. */}
          <div className="pt-2 md:pt-0">
            {/* Heading, with the olive star back beside it. The two on the
                photo are gone, so this is the section's only mark now — which
                is what the new design asks for, on phones as well as here.
                nowrap keeps the pair on one line: the phrase shrinks first. */}
            {/* Centred while the columns are stacked, so the heading lines up
                with the photo above it; beside the photo it stays left. */}
            <div className="mb-5 flex items-center gap-3 flex-wrap justify-center md:justify-start">
              <LocalisedHeading
                en={headings?.aboutEn ?? "/svg/a-few-words-about-me.svg"}
                uk={headings?.aboutUk ?? "/svg/a-few-words-about-me-uk.svg"}
                altEn="A few words about me"
                altUk="Кілька слів про мене"
                className="max-h-[38px] w-auto max-w-full h-auto min-w-0 shrink"
                ukClassName="max-h-[50px] sm:max-h-[48px] w-auto max-w-full h-auto min-w-0 shrink"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/star-olive.svg"
                alt=""
                aria-hidden="true"
                className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] shrink-0"
              />
            </div>

            {/* space-y stands in for the flex gap the paragraphs used to get.
                It is margin, not layout, so the block still wraps the float. */}
            <div className="space-y-5">
              <LocalisedText
                en={text?.aboutEn?.trim() || DEFAULT_ABOUT_EN}
                uk={text?.aboutUk ?? null}
                className="body-copy font-prose text-dark text-justify"
              />
            </div>
          </div>

          {/* Closes the float so the section's height counts the picture. */}
          <div className="clear-both" />
        </div>
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
      {/* Phones only now: from sm up the Instagram row stands in this spot,
          which is what the new design puts there. The negative bottom margin
          crops the drawing's blank band by very nearly the whole 24px the old
          padding gave, so 64px here leaves roughly the 45 the card asks for. */}
      <div className="sm:hidden w-full mx-auto pb-16 overflow-hidden">
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
