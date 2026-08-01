import Image from "next/image";
import DecorativeDots from "./DecorativeDots";
import type { SiteImage } from "@/lib/sanity";

export default function About({
  photo,
  illustration,
}: {
  photo: SiteImage;
  illustration: SiteImage;
}) {
  return (
    /* pt-6 is space handed over from Portfolio's bottom padding, not added on top */
    <section id="about" className="w-full bg-white pt-6 scroll-mt-[78px]">
      <DecorativeDots />

      {/* The mint stripe used to sit here. It is gone at every width, and the
          white spacer that separated it from the dots went with it — otherwise
          its height would have stayed behind as a gap. */}

      {/* Main content */}
      <div className="w-[78%] mx-auto pt-[104px] pb-10">
        {/* Photo + text grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[3fr_7fr] gap-10 items-stretch mb-10">

          {/* Photo column. The box carries the photo's own 3:4 ratio at every
              width, so it is exactly the picture — nothing is cropped and no
              letterboxing is left for the stars to float in. Keeping the text
              inside this height is the copy's job, not the photo's: see the
              fluid size on .about-copy. */}
          <div>
            <div className="relative w-full max-w-[272px] xl:max-w-[300px] mx-auto aspect-[3/4]">
              {/* Gold star — top-left, overlapping photo corner. The lg offsets
                  sit 10px further out because the old box was that much wider
                  than the picture; desktop is meant to look exactly as before. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/star-gold.svg"
                alt=""
                aria-hidden="true"
                className="absolute -top-10 -left-10 xl:-left-[50px] w-[85px] h-[85px] z-10 pointer-events-none"
              />
              {/* Photo */}
              <Image
                src={photo?.url ?? "/images/photo-olya.jpg"}
                alt="Olika Nikolska"
                fill
                sizes="(max-width: 1280px) 272px, 300px"
                className="object-cover object-top"
              />
              {/* Salmon star — bottom-left, overlapping photo corner */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/star-salmon.svg"
                alt=""
                aria-hidden="true"
                className="absolute -bottom-9 left-4 xl:left-[6px] w-[59px] h-[59px] z-10 pointer-events-none"
              />
            </div>
          </div>

          {/* Text column — stretches to photo height */}
          <div className="flex flex-col gap-5 pt-2">
            {/* Heading + star */}
            {/* nowrap keeps the star beside the heading; both shrink together on
                narrow screens rather than the star dropping to its own line */}
            <div className="flex items-center gap-3 flex-nowrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/a-few-words-about-me.svg"
                alt="A few words about me"
                className="h-[34px] sm:h-[52px] w-auto min-w-0 shrink"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/star-olive.svg"
                alt=""
                aria-hidden="true"
                className="w-[36px] h-[36px] sm:w-[53px] sm:h-[53px] shrink-0"
              />
            </div>

            <p className="about-copy font-['Outfit'] font-light leading-[1.7] text-dark text-justify">
              My name is Olika Nikolska, and I’ve been drawing for as long as I can remember. I’m a
              Ukrainian illustrator based in Odesa, and these days that looks like freelance
              illustration across books, stickers, portraits, and brand work, with four years at a
              mobile game studio somewhere along the way.
            </p>

            <p className="about-copy font-['Outfit'] font-light leading-[1.7] text-dark text-justify">
              Outside of work, I’m a matcha and cocoa person with a real weakness for tiramisu and
              anything with cinnamon or strawberry. I have a soft spot for collectible figures and
              building kits that are already making my shelves groan. I still draw by hand in paper
              sketchbooks too. In the evenings, I might read some fantasy or something about
              illustration, watch a series, check out YouTube, or just get lost in my feed. Home is
              the only place where I can truly exhale, which is probably why I do my best work right
              here.
            </p>

            <p className="about-copy font-['Outfit'] font-light leading-[1.7] text-dark text-justify">
              Living in Odesa means life comes with surprises, not always pleasant ones. But
              believing in better days and good endings is what keeps me going and gives me the
              energy to create.
            </p>
          </div>
        </div>

      </div>

      {/* Desk illustration — 60% page width, outside the narrow container */}
      {/* pb-10 rather than pb-16: Contact takes the other 24px above its dot trim */}
      <div className="w-full sm:w-[60%] mx-auto pb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={illustration?.url ?? "/images/illustration.png"}
          alt="Cozy desk illustration"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
