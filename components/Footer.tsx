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
        {/* Phones get the icons at 44px — the size the back-to-top button used
            to be — with the gap scaled to match. From sm up they are 36px, the
            size drawn over the mock: at 22px they read as small print rather
            than as buttons. The 8px gap comes from the same drawing. */}
        <div data-footer-icons className="flex justify-center gap-[18px] sm:gap-2 pt-16 pb-8">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="w-11 h-11 sm:w-9 sm:h-9 hover:opacity-80 transition-opacity"
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

        {/* Signature line. The year comes from the build, so it moves on with
            each deploy rather than being written into the markup. */}
        {/* pb-16 with the pt-16 above it: the beige band was asked to stand
            taller, and the room is split evenly above and below its contents
            so the icons and the signature stay centred in it. */}
        <p className="pb-16 text-center font-signature italic tracking-[0.12em] text-sm text-dark">
          Made with love by Lolikar © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
