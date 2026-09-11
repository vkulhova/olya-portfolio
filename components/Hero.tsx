import Image from "next/image";
import LocalisedText from "./LocalisedText";
import LocalisedHeading from "./LocalisedHeading";
import { backdropUrl } from "@/lib/sanity";
import DecorativeDots from "./DecorativeDots";
import type { SiteHeadings, SiteImage, SiteText } from "@/lib/sanity";

/** Used until the Studio field is filled in. */
const DEFAULT_HERO_EN = `My name is Olika, and my art lives under Lolikar. I make warm, cozy, detailed illustrations for games and books, design characters, and create custom portraits. I love building small worlds you want to get lost in, filling them with little objects, cozy details, and characters that feel like they have their own story. I’m drawn to vintage aesthetics, rich colors, soft textures, and the kind of detail you keep discovering on every look.`;

export default function Hero({
  avatar,
  background,
  backgroundMobile,
  ribbon,
  text,
  headings,
}: {
  avatar: SiteImage;
  background?: SiteImage;
  backgroundMobile?: SiteImage;
  /** The line of hearts. It used to sit above every section, in SiteHeader;
   *  cards #64 and #69 put it under each section's coloured band instead, so
   *  each section draws its own now. */
  ribbon?: string;
  text?: SiteText;
  headings?: SiteHeadings;
}) {
  const backdrop = backdropUrl(background);
  /* Phones get their own upload when Studio has one. A wide backdrop covers the
     band there by showing only its middle strip, so a picture drawn for the
     desktop band rarely survives the crop. 900px is enough for a 3x phone. */
  const mobileBackdrop = backdropUrl(backgroundMobile, 900);

  return (
    /* The stripe, the logo and the nav are in SiteHeader — they stay put while
       this section is swapped for another one. */
    <>
      {/* The band is the first thing below the fold's edge, so its backdrop is
          asked for straight away rather than when the style is applied. */}
      {backdrop && <link rel="preload" as="image" href={backdrop} fetchPriority="high" />}

      {/* Gold hero section — height follows card content so nothing overflows on
          small screens. An uploaded backdrop covers the band; the mustard stays
          underneath so the area is never bare while the image loads. */}
      <div
        className="relative w-full py-16 md:py-[13.9%] flex items-center justify-center"
        style={{
          backgroundColor: "#D5BA54",
          ...(backdrop
            ? {
                backgroundImage: `url(${backdrop})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : null),
        }}
      >
        {/* Card #54 set these two numbers against a drawing: the card is 53% of
            the window from lg up, centred, and the band carries 13.9% of the
            window's width as padding above and below it. Both are proportions
            rather than pixels because that is what the card asked for — the
            band then keeps its shape at any width, and the room it leaves
            around the card is the room the illustrations are meant to fill.

            The phone backdrop sits over the band's own background rather than
            replacing it in the style above, which cannot hold a media query.
            Nothing renders unless Studio has a phone upload, so the desktop
            band is untouched. */}
        {mobileBackdrop && (
          <div
            aria-hidden="true"
            className="absolute inset-0 sm:hidden bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url(${mobileBackdrop})` }}
          />
        )}

        {/* Card wrapper — width narrows on small screens, height follows content */}
        {/* The cream stars that used to straddle this card's top and bottom-right
            corners are gone: the band is getting a drawn backdrop instead, and
            the stars would only have to be nudged around whatever it shows. */}
        {/* 73.6% on a phone — the 433px the drawing on card #69 measures out of
            its 588. It was 65.7%, taken from the red marks on card #61, which
            card #69 asks to widen. Wider screens keep what card #54 set. */}
        <div className="relative z-10 w-[73.6%] sm:w-[85%] md:w-[62%] lg:w-[847px]">

          {/* Hero card */}
          <div className="w-full bg-white rounded-[6px]">
            {/* Side by side from lg, stacked below it. The greeting is a
                drawing, so a column too narrow for it does not wrap the
                greeting — it scales the whole thing down, height included. On
                a tablet that is what left it at 25px once card #54 narrowed
                the card. Rather than guess at a width where it still fits,
                the avatar and the greeting only share a line from lg up,
                where the measurements below show there is room for the
                greeting at its full size. */}
            {/* 32px of side padding on a phone rather than 24: the green marks
                on card #61 put the greeting and the copy 34 and 29 in from the
                card's edges. */}
            {/* From lg the card is one fixed composition, 847px wide — card #88.
                Every figure is the drawing's, measured at its 1723 window: 55
                to the avatar, a 314 avatar, 46 to the copy, a 365 column, 67 to
                the edge, and 58 above and below the avatar, which makes the
                card the drawing's 430 tall.

                Fixed rather than a share of the window on purpose. The card
                asks for the avatar to run from the top of the greeting to the
                bottom of the copy. With a percentage the column narrows as the
                window does, the copy takes more lines, and the two meet at one
                width only — which is where card #64 had to leave it. At a fixed
                column the copy sets in the same lines on every laptop, so they
                meet everywhere. Below lg nothing here changes. */}
            <div className="w-full px-8 sm:px-6 py-10 md:px-12 md:py-8 lg:pl-[55px] lg:pr-[67px] lg:py-[58px] flex flex-col lg:flex-row items-center gap-6 lg:gap-[46px]">
            {/* Avatar circle — fixed responsive sizes so it never overflows on narrow screens */}
            {/* 314 from lg, one size at every width: the card no longer
                narrows with the window, so there is no step where the circle
                has to shrink to leave the greeting room. 314 is the box whose
                drawing comes out at the 294 the mockup measures — the avatar
                file carries a thin transparent ring. */}
            <div className="shrink-0 w-48 h-48 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-[314px] lg:h-[314px] rounded-full overflow-hidden">
              <Image
                src={avatar?.url ?? "/images/avatar.png"}
                alt="Olika"
                width={314}
                height={314}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text content */}
            {/* gap-4, not the 6 it had. The phrase is a drawing whose box ends
                where its descenders do, so the 24px sat under the tail of the
                lettering rather than under the line of it — the greeting and
                the paragraph read as two separate blocks. 16px closes them up
                without letting them touch. Both languages, one container. */}
            {/* 33 between greeting and copy from lg: the drawing measures 40 from
                the lettering's last ink to the first line's, and the line box
                carries 7 of that above its letters. */}
            <div className="flex flex-col gap-4 lg:gap-[33px] items-center text-center lg:items-start lg:text-left min-w-0">
              <LocalisedHeading
                en={headings?.heroEn ?? "/svg/hello-and-welcome.svg"}
                uk={headings?.heroUk ?? "/svg/hello-and-welcome-uk.svg"}
                /* From lg the greeting is set to a height rather than capped
                   at one — card #88 draws it 53px tall, and the drawing's own
                   box is only 49, so max-h could never reach it. object-contain
                   keeps the lettering in proportion if the 365 column is the
                   narrower of the two, and object-left keeps it on the copy's
                   left edge. */
                altEn="Hello and welcome"
                altUk="Вітаю, рада що ви тут"
                className="max-h-[38px] w-auto max-w-full h-auto lg:h-[53px] lg:max-h-none lg:object-contain lg:object-left"
                /* The Ukrainian lettering hangs from the top of its box and
                   spends the lower part on descenders, so at the same 32px
                   below the card's edge it reads as sitting higher than the
                   English does. The small top margin drops it back onto the
                   line it was asked for; English is untouched.

                   The box is 56 rather than the 66 it was sized to. That 66
                   matched the height of the letters themselves to the English
                   drawing, but the Ukrainian one spends a third of its box on
                   ascenders, the comma and the «:)» — so an equal letter
                   height still made the block a third taller than the English
                   one and left the greeting looming over copy set at 14px.
                   At 56 the letters land just under the About phrase's and
                   the block sits level with the paragraph under it. */
                ukClassName="mt-1.5 md:mt-2 max-h-[50px] sm:max-h-[48px] w-auto max-w-full h-auto lg:h-[67px] lg:max-h-none lg:object-contain lg:object-left"
              />

              <LocalisedText
                en={text?.heroEn?.trim() || DEFAULT_HERO_EN}
                uk={text?.heroUk ?? null}
                className="body-copy font-prose text-dark text-justify"
              />
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* The hearts, under the mustard rather than over it. The drawing on card
          #64 measures 38px of white between the band and the line's first ink,
          and 92 between its last ink and the first row of work — the line's own
          box carries 2px above the drawing, hence 36 here.

          Nothing below: the room under the line is Portfolio's own top
          padding, which this used to be added on top of. The phone drawing on
          card #69 measures the same 38 above and 91 below, so both widths take
          the same figure here. */}
      {/* 40px of white between the coloured band and the line's first ink,
          the same at every band — card #91. The line's own box carries 2px
          above its drawing, hence 38. On a phone the card came back asking for
          a touch less than 40: 34, the figure the phone drawing for About
          measures, so 32 here. */}
      <div className="bg-white pt-[32px] sm:pt-[38px]">
        <DecorativeDots colour={ribbon} />
      </div>
    </>
  );
}
