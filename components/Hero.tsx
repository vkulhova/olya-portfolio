import Image from "next/image";
import StripeBar from "./StripeBar";
import DecorativeDots from "./DecorativeDots";

export default function Hero() {
  return (
    <section id="home" className="w-full">
      <StripeBar />

      {/* White logo + nav area — pb-8 gives white gap below визерунок before gold */}
      <div className="bg-white pt-8 pb-8 flex flex-col items-center gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/svg/lolikar.svg" alt="Lolikar" className="h-16 w-auto" />

        <nav className="flex gap-10">
          {(["portfolio", "about", "contact"] as const).map((link, i) => (
            <a
              key={link}
              href={`#${link}`}
              className={`font-futura text-sm tracking-[0.25em] uppercase transition-colors hover:text-gold ${i === 0 ? "text-gold font-extrabold" : "text-dark font-bold"}`}
            >
              {link}
            </a>
          ))}
        </nav>

        <DecorativeDots />
      </div>

      {/* Gold hero section — fixed height so child % sizing works */}
      <div
        className="relative w-full h-[580px] flex items-center justify-center"
        style={{ background: "#D5BA54" }}
      >
        {/* Background decorative patterns */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/svg/hero-pattern.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-80"
        />
        {/* Star 3 — floats on gold background, bottom-left area */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/svg/star-cream.svg"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-8 left-10 w-20 h-20 pointer-events-none z-10"
        />

        {/* Card wrapper — 69% width × 65% height of gold section */}
        <div className="relative z-10 w-[69%] h-[65%]">

          {/* Star 1 — attached to card, overlaps top edge slightly left of center */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/star-cream.svg"
            alt=""
            aria-hidden="true"
            className="absolute -top-10 left-[28%] w-20 h-20 pointer-events-none z-20"
          />

          {/* Star 2 — attached to card, overlaps bottom-right corner */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/star-cream.svg"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-10 -right-10 w-16 h-16 pointer-events-none z-20"
          />

          {/* Hero card */}
          <div className="scalloped-all w-full h-full bg-white">
            <div className="w-full h-full px-12 flex flex-row items-center gap-8 overflow-hidden">
            {/* Avatar circle — 83% of card height, no border */}
            <div className="shrink-0 h-[83%] aspect-square rounded-full overflow-hidden">
              <Image
                src="/images/avatar.png"
                alt="Olika"
                width={176}
                height={176}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-4 items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/hello-and-welcome.svg"
                alt="Hello and welcome"
                className="h-[62px] w-auto"
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
    </section>
  );
}
