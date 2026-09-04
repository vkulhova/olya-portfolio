import Image from "next/image";
import LocalisedText from "./LocalisedText";
import LocalisedHeading from "./LocalisedHeading";
import { backdropUrl } from "@/lib/sanity";
import type { SiteHeadings, SiteImage, SiteText } from "@/lib/sanity";

/** Used until the Studio field is filled in. */
const DEFAULT_HERO_EN = `My name is Olika, and my art lives under Lolikar. I make warm, cozy, detailed illustrations for games and books, design characters, and create custom portraits. I love building small worlds you want to get lost in, filling them with little objects, cozy details, and characters that feel like they have their own story. I’m drawn to vintage aesthetics, rich colors, soft textures, and the kind of detail you keep discovering on every look.`;

export default function Hero({
  avatar,
  background,
  backgroundMobile,
  text,
  headings,
}: {
  avatar: SiteImage;
  background?: SiteImage;
  backgroundMobile?: SiteImage;
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
        <div className="relative z-10 w-[90%] sm:w-[85%] md:w-[62%] lg:w-[53%]">

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
            <div className="w-full px-6 py-10 md:px-12 md:py-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-6 xl:gap-8">
            {/* Avatar circle — fixed responsive sizes so it never overflows on narrow screens */}
            {/* Smaller between lg and xl. At 1024 the card is 53% of a narrow
                window, and the circle at its old 192px left the greeting 239px
                where it needs 267 — so it scaled down to 34. At 144, with the
                tighter gap below, the greeting keeps its full size; from xl
                there is room for the circle to go back up. */}
            <div className="shrink-0 w-48 h-48 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-36 lg:h-36 xl:w-44 xl:h-44 rounded-full overflow-hidden">
              <Image
                src={avatar?.url ?? "/images/avatar.png"}
                alt="Olika"
                width={176}
                height={176}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text content */}
            {/* gap-4, not the 6 it had. The phrase is a drawing whose box ends
                where its descenders do, so the 24px sat under the tail of the
                lettering rather than under the line of it — the greeting and
                the paragraph read as two separate blocks. 16px closes them up
                without letting them touch. Both languages, one container. */}
            <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left min-w-0">
              <LocalisedHeading
                en={headings?.heroEn ?? "/svg/hello-and-welcome.svg"}
                uk={headings?.heroUk ?? "/svg/hello-and-welcome-uk.svg"}
                altEn="Hello and welcome"
                altUk="Вітаю, рада що ви тут"
                className="max-h-[38px] sm:max-h-[38px] w-auto max-w-full h-auto"
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
                ukClassName="mt-1.5 md:mt-2 max-h-[50px] sm:max-h-[48px] w-auto max-w-full h-auto"
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
    </>
  );
}
