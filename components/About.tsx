import Image from "next/image";
import LocalisedText from "./LocalisedText";
import LocalisedHeading from "./LocalisedHeading";
import type { SiteHeadings, SiteImage, SiteText } from "@/lib/sanity";
import DecorativeDots from "./DecorativeDots";
import WrapGap from "./WrapGap";

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
  ribbon,
}: {
  photo: SiteImage;
  illustration: SiteImage;
  text?: SiteText;
  headings?: SiteHeadings;
  bandColour?: string;
  bandImage?: string | null;
  /** The line of hearts, drawn by the section now rather than by SiteHeader. */
  ribbon?: string;
}) {
  return (
    <section id="about" className="w-full bg-white scroll-mt-[78px]">
      {/* The hearts. They used to be drawn once in SiteHeader for every
          section; cards #64, #66 and #67 move them under each section's own
          coloured band, so each section draws its own. This one is still in
          its old place, above the section, and moves down when that section's
          own card is done — leaving it here keeps the seam as it was rather
          than removing the line for a while. */}
      {/* Coloured band, desktop only. Studio can put a picture here instead of
          the colour; both arrive as variables because .about-band has to hold
          them behind a media query. */}
      <div
        className="about-band pt-[13.8%] pb-[17.2%] sm:py-[13.1%]"
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
      {/* 79.5% of the window, centred, capped at 1178px. Card #87 draws the
          card 1071 wide in a 1347 window, which is the 79.5%; card #66 draws
          it 1178 wide at 1728, which is where the cap comes from — so both
          drawings hold exactly, and between them the card simply stops
          growing. It was 72% capped at 1216, from card #55.

          The cap is there for the reason #55 gave: past it the card would be
          an extrapolation of the drawing rather than the drawing, the copy
          setting in fewer lines while the photo only gets taller. */}
      <div className="w-[71.3%] sm:w-[79.5%] sm:max-w-[1178px] xl:w-[1079px] xl:max-w-none mx-auto">
        {/* White card, desktop only — 6px corners, as the design asks. On
            phones the photo and the copy sit straight on the page. */}
        <div className="bg-white rounded-[6px] px-[13.4%] pt-16 pb-[42px] sm:px-14 md:px-20 sm:py-12 md:py-16 xl:pl-[70px] xl:pr-[43px] xl:py-[72px]">
        {/* Photo and copy. Not a grid: in two columns the copy had nowhere to
            go once it outgrew the picture, so it piled up in its own narrow
            half and hung far below the photo on middle-sized screens. The
            picture is floated instead, so the copy sets beside it and then
            carries on underneath at the full width of the section — the text
            moves sideways as the window narrows rather than downwards.

            Below md there is no float: the picture is a centred block with the
            copy under it, exactly as before. */}
        {/* No bottom margin from md: beside the photo the card's own 64px of
            padding is all the drawing on card #66 leaves under the content,
            and this margin was adding 40 more. Below md the photo sits above
            the copy and the margin is the gap between the two blocks. */}
        {/* From xl the card is one fixed composition — card #89, measured at
            its 1728 window: 70 to a 323 x 448 photo, 67 to a 576 column, 43 to
            the edge, and the card 598 tall. Two columns rather than the
            float: the drawing sets the copy beside the photo only, never under
            it, and the card asks for the photo to run from the top of the
            greeting to the bottom of the copy.

            Fixed for the reason card #88 gave the hero card: at a fixed column
            the copy sets in the same lines on every screen from xl, so photo
            and copy meet at every width rather than one. 1079 does not fit a
            1024 window, so between lg and xl the float from card #87 stays.

            72 above and below rather than the 75 the drawing puts around the
            photo: the copy column's box is 6px taller than the photo, so it is
            the column that sets the card's height, and 72 is what brings the
            card to 598 with the photo sitting 75 in from both edges. */}
        <div className="mb-4 sm:mb-10 md:mb-0 xl:flex xl:items-center xl:gap-[67px]">

          {/* The box carries the photo's own 3:4 ratio at every width, so it is
              exactly the picture — nothing is cropped and no letterboxing is
              left for the stars to float in. mb-16 on phones is the 64px the
              grid's row gap used to give it; the salmon star hangs 36px below
              the frame and needs the room.

From md up the picture is 31.6% of the card's inner width —
              the 28% of its outer width the drawing shows, once the card's own
              padding is taken off — and carries 288:431, which is what the drawing on card #87 measures (it was 340:481 from card #55, then 324:411 from #66): the photo
              runs from the top of the drawn phrase to the last line of the
              copy. It is a proportion rather than a pixel width so that the
              two keep meeting as the window changes — an exact height would
              hold at one width and nowhere else, and would go stale the moment
              the text is edited in Studio. */}
          <div className="xl:w-[323px] xl:shrink-0">
            {/* 8px under the picture from md, not the 40 it had — card #87. The
                float's bottom margin counts towards the card's height whenever
                the picture is the taller of the two, so 40 was adding 26px of
                empty card under the copy that the drawing does not have. At 8
                the card comes out at the drawing's 572 with 68 under the last
                line, and copy that wraps under the picture on narrower screens
                still starts 18px clear of it. */}
            {/* Between md and xl the 8px under the picture is only a fallback:
                WrapGap sets the margin and nudges the height so the copy
                closing up underneath sits as far from the photo as the copy
                beside it — cards #99 and #105. */}
            <div
              data-about-photo
              className="relative w-full sm:max-w-[272px] md:w-[31.6%] md:max-w-none mx-auto mb-[47px] md:mx-0 md:mb-2 md:mr-[6.7%] md:float-left aspect-[294/346] sm:aspect-[3/4] md:aspect-[288/431] xl:w-full xl:float-none xl:mr-0 xl:mb-0 xl:aspect-[323/448]"
            >
              {/* Photo */}
              <Image
                src={photo?.url ?? "/images/photo-olya.jpg"}
                alt="Olika Nikolska"
                fill
                sizes="(max-width: 768px) 272px, (min-width: 1280px) 323px, 300px"
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
          <div className="pt-2 md:pt-0 xl:flex-1 xl:min-w-0">
            {/* Heading, with the olive star back beside it. The two on the
                photo are gone, so this is the section's only mark now — which
                is what the new design asks for, on phones as well as here.
                nowrap keeps the pair on one line: the phrase shrinks first. */}
            {/* Centred while the columns are stacked, so the heading lines up
                with the photo above it; beside the photo it stays left. */}
            {/* nowrap, not wrap — card #77. Between 768 and 1023 the text
                column is narrow enough that the pair no longer fitted on one
                line, and the star dropped underneath the phrase on its own.
                The phrase carries min-w-0 and shrink, so it is the one that
                gives way now, exactly as the Contact heading already did. */}
            <div className="mb-[42px] sm:mb-5 xl:mb-[39px] flex items-center gap-3 lg:gap-4 flex-nowrap justify-center md:justify-start">
              <LocalisedHeading
                en={headings?.aboutEn ?? "/svg/a-few-words-about-me.svg"}
                uk={headings?.aboutUk ?? "/svg/a-few-words-about-me-uk.svg"}
                altEn="A few words about me"
                altUk="Кілька слів про мене"
                className="max-h-[38px] w-auto max-w-full h-auto min-w-0 shrink xl:h-[55px] xl:max-h-none xl:object-contain xl:object-left"
                ukClassName="max-h-[50px] sm:max-h-[48px] w-auto max-w-full h-auto min-w-0 shrink xl:h-[69px] xl:max-h-none xl:object-contain xl:object-left"
              />
              {/* Not on a phone: the drawing on card #70 shows the phrase on
                  its own there, and the card is narrow enough that the star
                  beside it would only shrink the lettering. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/star-olive.svg"
                alt=""
                aria-hidden="true"
                className="hidden sm:block w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] shrink-0"
              />
            </div>

            {/* space-y stands in for the flex gap the paragraphs used to get.
                It is margin, not layout, so the block still wraps the float. */}
            <div data-about-copy className="space-y-5 xl:space-y-3">
              <WrapGap />
              <LocalisedText
                en={text?.aboutEn?.trim() || DEFAULT_ABOUT_EN}
                uk={text?.aboutUk ?? null}
                className="body-copy font-prose text-dark text-justify"
              />
            </div>
          </div>

          {/* Closes the float so the section's height counts the picture. */}
          <div className="clear-both xl:hidden" />
        </div>

        {/* The desk, phones only. It used to sit under the band, drawn wider
            than the screen so its blank margins ran off the edges; card #70
            puts it inside the white card, under the copy.

            160% of the card's inner width, which is what makes the drawing
            itself come out at the 269 by 276 the phone drawing measures: the
            file carries wide transparent margins, so its box has to be much
            larger than the picture in it. The box overflows the card on both
            sides, which nothing can see — it is empty there — and stays
            inside the screen at every phone width. From sm up the Instagram
            row stands in this spot instead. */}
        <div className="sm:hidden mt-[66px] w-[160%] max-w-none relative left-1/2 -translate-x-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={illustration?.url ?? "/images/illustration.png"}
            alt="Cozy desk illustration"
            className="w-full h-auto"
          />
        </div>
        </div>

      </div>
      </div>

      {/* The hearts, under the milky band rather than over it — cards #66 and
          #70. The drawings put 40px of white above the line's first ink on the
          desktop and 34 on a phone, and the line's own box carries 2px above
          the drawing; the room below it is the Instagram row's own plus what
          is added here, to reach the 127px the desktop drawing measures down
          to that line of copy and the 93 the phone one does. */}
      {/* 40px of white between the coloured band and the line's first ink,
          the same at every band and every width — card #91. The line's own
          box carries 2px above its drawing, hence 38. */}
      <div className="bg-white pt-[38px] pb-[42px]">
        <DecorativeDots colour={ribbon} />
      </div>

    </section>
  );
}
