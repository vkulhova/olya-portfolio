import Image from "next/image";
import DecorativeDots from "./DecorativeDots";

export default function About() {
  return (
    /* pt-6 is space handed over from Portfolio's bottom padding, not added on top */
    <section id="about" className="w-full bg-white pt-6 scroll-mt-[78px]">
      <DecorativeDots />

      {/* White gap between dots and mint stripe */}
      <div className="h-9 bg-white" />

      {/* Mint stripe with vector illustrations — decoration-about.svg IS the stripe */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svg/decoration-about.svg"
        alt=""
        aria-hidden="true"
        className="w-full h-auto block"
      />

      {/* Main content */}
      <div className="w-[78%] mx-auto pt-[104px] pb-10">
        {/* Photo + text grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-10 items-stretch mb-10">

          {/* Photo column with stars */}
          <div className="relative">
            {/* Gold star — top-left, overlapping photo corner */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/svg/star-gold.svg"
              alt=""
              aria-hidden="true"
              className="absolute -top-10 -left-10 w-[85px] h-[85px] z-10 pointer-events-none"
            />
            {/* Photo */}
            <div className="relative w-full h-[320px] lg:h-full min-h-[380px] overflow-hidden">
              <Image
                src="/images/photo-olya.jpg"
                alt="Olika Nikolska"
                fill
                className="object-contain object-top"
              />
            </div>
            {/* Salmon star — bottom-left, overlapping photo corner */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/svg/star-salmon.svg"
              alt=""
              aria-hidden="true"
              className="absolute -bottom-9 left-4 w-[59px] h-[59px] z-10 pointer-events-none"
            />
          </div>

          {/* Text column — stretches to photo height */}
          <div className="flex flex-col gap-5 pt-2">
            {/* Heading + star */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/a-few-words-about-me.svg"
                alt="A few words about me"
                className="h-[52px] w-auto"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/star-olive.svg"
                alt=""
                aria-hidden="true"
                className="w-[53px] h-[53px]"
              />
            </div>

            <p className="font-['Outfit'] font-light text-base leading-[1.7] text-dark text-justify">
              My name is Olika Nikolska. I&apos;m a Ukrainian illustrator based in Odesa, with a background
              that includes four years at a mobile game studio and years of freelance work spanning books,
              stickers, portraits, and brand illustration.
            </p>

            <p className="font-['Outfit'] font-light text-base leading-[1.7] text-dark text-justify">
              Outside of work, I&apos;m a matcha and cocoa person with a real weakness for tiramisu and
              anything with cinnamon or strawberry. I also have a soft spot for collectible figures and
              building sets — my shelves will confirm that. I love sketching in a paper sketchbook and
              sharing my space with a cat, whom I also walk on a leash. He stops at every flower and
              leaf like it&apos;s the most important thing in the world, and honestly, he&apos;s not
              wrong. A good series, a YouTube video, or a TikTok rabbit hole can easily take over my
              evening. Home is where I feel most at ease, which is probably why I do my best work there.
            </p>

            <p className="font-['Outfit'] font-light text-base leading-[1.7] text-dark text-justify">
              Living in Odesa means life comes with surprises, and not always pleasant ones. But
              believing in better days and good endings is what keeps me drawing.
            </p>
          </div>
        </div>

      </div>

      {/* Desk illustration — 60% page width, outside the narrow container */}
      {/* pb-10 rather than pb-16: Contact takes the other 24px above its dot trim */}
      <div className="w-[60%] mx-auto pb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/illustration.png"
          alt="Cozy desk illustration"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
