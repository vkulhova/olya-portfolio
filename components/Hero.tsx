import Image from "next/image";
import LocalisedText from "./LocalisedText";
import LocalisedHeading from "./LocalisedHeading";
import { backdropUrl } from "@/lib/sanity";
import type { SiteImage, SiteText } from "@/lib/sanity";

/** Used until the Studio field is filled in. */
const DEFAULT_HERO_EN = `My name is Olika, and my art lives under Lolikar. I make warm, cozy, detailed illustrations for games and books, design characters, and create custom portraits. I love building small worlds you want to get lost in, filling them with little objects, cozy details, and characters that feel like they have their own story. I’m drawn to vintage aesthetics, rich colors, soft textures, and the kind of detail you keep discovering on every look.`;

export default function Hero({
  avatar,
  background,
  text,
}: {
  avatar: SiteImage;
  background?: SiteImage;
  text?: SiteText;
}) {
  const backdrop = backdropUrl(background);

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
        className="relative w-full py-16 md:py-20 flex items-center justify-center"
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
        {/* Card wrapper — width narrows on small screens, height follows content */}
        <div className="relative z-10 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[69%]">

          {/* Star 1 — straddles the card's top edge, centered above the avatar */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/star-cream.svg"
            alt=""
            aria-hidden="true"
            className="absolute -top-6 left-[23%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none z-20"
          />

          {/* Star 2 — attached to card, overlaps bottom-right corner */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/star-cream.svg"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-10 right-4 w-16 h-16 pointer-events-none z-20"
          />

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
            <div className="flex flex-col gap-6 items-center text-center md:items-start md:text-left min-w-0">
              <LocalisedHeading
                en="/svg/hello-and-welcome.svg"
                uk="/svg/hello-and-welcome-uk.svg"
                altEn="Hello and welcome"
                altUk="Привіт, рада що ви тут"
                className="h-[37px] md:h-[48px] w-auto max-w-full"
                ukClassName="h-[44px] md:h-[57px] w-auto max-w-full"
              />

              <LocalisedText
                en={text?.heroEn?.trim() || DEFAULT_HERO_EN}
                uk={text?.heroUk ?? null}
                className="font-outfit font-normal text-sm leading-[1.6] tracking-[0.04em] text-dark"
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
