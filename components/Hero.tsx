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
        className="relative w-full py-16 md:py-24 flex items-center justify-center"
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
        {/* The phone backdrop sits over the band's own background rather than
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
        <div className="relative z-10 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[69%]">

          {/* Hero card */}
          <div className="w-full bg-white rounded-3xl">
            <div className="w-full px-6 py-10 md:px-12 md:py-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Avatar circle — fixed responsive sizes so it never overflows on narrow screens */}
            <div className="shrink-0 w-48 h-48 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden">
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
            <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left min-w-0">
              <LocalisedHeading
                en={headings?.heroEn ?? "/svg/hello-and-welcome.svg"}
                uk={headings?.heroUk ?? "/svg/hello-and-welcome-uk.svg"}
                altEn="Hello and welcome"
                altUk="Вітаю, рада що ви тут"
                className="h-[37px] sm:h-[44px] w-auto max-w-full"
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
                ukClassName="mt-1.5 md:mt-2 h-[44px] sm:h-[48px] w-auto max-w-full"
              />

              <LocalisedText
                en={text?.heroEn?.trim() || DEFAULT_HERO_EN}
                uk={text?.heroUk ?? null}
                className="body-copy font-outfit tracking-[0.04em] text-dark"
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
