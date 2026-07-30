import Image from "next/image";
import StripeBar from "./StripeBar";
import DecorativeDots from "./DecorativeDots";
import Nav from "./Nav";
import { LanguageSwitcher } from "./Language";

export default function Hero() {
  return (
    /* Fragment, not a wrapper element: the nav below has to be a direct child of
       <main> for `sticky` to hold all the way down the page. Nested in a section
       it would unstick as soon as that section scrolled past. */
    <>
      <div id="home">
        <StripeBar />

        {/* Logo. pb here + the nav's own py keep the original 43px gap. */}
        <div className="relative bg-white pt-[53px] pb-[23px] flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svg/lolikar.svg" alt="Lolikar" className="h-24 w-auto" />

          {/* Top-right of the header, above the nav row. Its twin in the pinned
              bar takes over once this one scrolls away. */}
          <LanguageSwitcher className="absolute right-8 top-6 hidden sm:flex" />
        </div>
      </div>

      {/* Pins to the top of the viewport once scrolled to, and lights up the
          section currently in view */}
      <Nav />

      {/* pt here + the nav's py keep the original 40px gap; pb-8 the white gap before gold */}
      <div className="bg-white pt-[20px] pb-8">
        <DecorativeDots />
      </div>

      {/* Gold hero section — height follows card content so nothing overflows on small screens */}
      <div
        className="relative w-full py-16 md:py-20 flex items-center justify-center"
        style={{ background: "#D5BA54" }}
      >
        {/* Card wrapper — width narrows on small screens, height follows content */}
        <div className="relative z-10 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[69%]">

          {/* Star 1 — straddles the card's top edge, centered above the avatar */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/star-cream.svg"
            alt=""
            aria-hidden="true"
            className="absolute -top-2 left-[23%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none z-20"
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
            <div className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden">
              <Image
                src="/images/avatar.png"
                alt="Olika"
                width={176}
                height={176}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-6 items-center text-center md:items-start md:text-left min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/hello-and-welcome.svg"
                alt="Hello and welcome"
                className="h-[37px] md:h-[48px] w-auto max-w-full"
              />

              <p className="font-outfit font-normal text-sm leading-[1.6] tracking-[0.04em] text-dark">
                My name is Olika, and my art lives under Lolikar. I make warm, cozy, detailed
                illustrations — mainly children&apos;s book art, character design, and custom portraits.
                Every piece is meant to feel like a small world you&apos;d want to step into, filled
                with little objects, cozy homes, and characters that feel lived in. I have a love for
                small details, vintage aesthetics, and soft textures that reward a second look.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
