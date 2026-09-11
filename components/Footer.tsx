import { footerColour, socialCircleColour } from "@/lib/sanity";
import { paintSocial } from "./socialIcons";

const socials = [
  { name: "Behance",   href: "https://www.behance.net/nikolska",                        slug: "behance" },
  { name: "Instagram", href: "https://www.instagram.com/by.lolikar",                   slug: "instagram" },
  { name: "Pinterest", href: "https://de.pinterest.com/olikanikolskaia/",              slug: "pinterest" },
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/olika-nikolska-5222b23b0/",  slug: "linkedin" },
];

export default function Footer({
  colour,
  iconColour,
}: {
  colour?: string | null;
  iconColour?: string | null;
}) {
  const band = footerColour(colour);
  const circle = socialCircleColour(iconColour);
  return (
    <footer className="w-full bg-white">
      {/* No dot ribbon down here any more, and no white strips around it: the
          section above ends on its own colour and the beige starts straight
          after it. One ribbon at the top of the page is enough — a second one
          this close to the icons and the signature crowded the foot of the
          page. */}

      {/* The band carries its own colour, set in Studio the way the hero and
          contact backdrops are. */}
      <div data-footer-band style={{ backgroundColor: band }}>
        {/* Phones: 44px icons, 45 below the band's top, 7 between them and 14
            of air under them — card #63's figures, measured off its drawing.
            The back-to-top button is 44 there too, so the two match. */}
        {/* From sm the icons are 55px, 10 apart and 80 below the band's top —
            card #92, which also makes the back-to-top button the same 55 and
            sets it on this row's centre line. 12 under them brings the
            address's first ink to the 20px the drawing leaves. Phones keep
            card #63's figures. */}
        {/* 2px more under the icons at every width since card #104 took the
            lines below from 28px to 24: the address's first line lost 2px
            above its letters, and this puts them back where they were. */}
        <div data-footer-icons className="flex justify-center gap-[7px] sm:gap-[10px] pt-[45px] sm:pt-[80px] pb-[16px] sm:pb-[14px]">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="w-11 h-11 sm:w-[55px] sm:h-[55px] hover:opacity-80 transition-opacity"
            >
              {/* The glyph is painted in the band's own colour, so the mark
                  reads as a knock-out whatever colour Studio sets. The markup
                  is ours, from components/socialIcons.ts — nothing here comes
                  from outside. */}
              <span
                aria-hidden="true"
                className="block w-full h-full"
                dangerouslySetInnerHTML={{ __html: paintSocial(s.slug, circle, band) }}
              />
            </a>
          ))}
        </div>

        {/* The address, above the signature and set in the same face, per the
            drawing on card #53. It is a mailto rather than plain text: it is
            the one place on the site outside the form where a visitor can
            start a letter, and an address that cannot be tapped on a phone is
            an address that gets copied by hand or not at all. Same colour and
            weight as the line under it, so the pair still reads as one block;
            the hover is the only thing that gives it away as a link. */}
        <p className="text-center font-signature italic text-dark">
          <a
            href="mailto:hi.lolikar@gmail.com"
            className="hover:opacity-70 transition-opacity"
          >
            hi.lolikar@gmail.com
          </a>
        </p>

        {/* Signature line. The year comes from the build, so it moves on with
            each deploy rather than being written into the markup. */}
        <p className="text-center font-signature italic text-dark">
          Made with love by Lolikar © {new Date().getFullYear()}
        </p>

        {/* Its own line under the signature, in the same face — card #92. The
            band's bottom padding moved down onto it: 62 from sm leaves the
            69px the drawing measures under the last ink; phones keep the 46
            they had under the signature. Both 2px more since card #104, for
            the 2px the 24px line gave up under its letters. */}
        <p className="pb-[48px] sm:pb-[64px] text-center font-signature italic text-dark">
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
