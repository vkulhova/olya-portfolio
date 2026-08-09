import DecorativeDots from "./DecorativeDots";
import { footerColour } from "@/lib/sanity";

const socials = [
  { name: "Behance",   href: "https://www.behance.net/nikolska",                        icon: "/svg/social-behance.svg" },
  { name: "Instagram", href: "https://www.instagram.com/by.lolikar",                   icon: "/svg/social-instagram.svg" },
  { name: "Pinterest", href: "https://de.pinterest.com/olikanikolskaia/",              icon: "/svg/social-pinterest.svg" },
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/olika-nikolska-5222b23b0/",  icon: "/svg/social-linkedin.svg" },
];

export default function Footer({ colour }: { colour?: string | null }) {
  return (
    <footer className="w-full bg-white">
      <div className="h-9 bg-white" />
      <DecorativeDots />

      {/* Everything below the dot ribbon sits on its own colour, set in Studio
          the way the hero and contact backdrops are; the strip above it stays
          white so the ribbon still reads against the page. */}
      <div style={{ backgroundColor: footerColour(colour) }}>
        {/* Phones get the icons at 44px — the size the back-to-top button used
            to be — with the gap scaled to match. From sm up the row keeps the
            original 22px icons and its 9px gap. */}
        <div className="flex justify-center gap-[18px] sm:gap-[9px] pt-12 pb-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="w-11 h-11 sm:w-[22px] sm:h-[22px] hover:opacity-80 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.icon} alt={s.name} className="w-full h-full object-contain" />
            </a>
          ))}
        </div>

        {/* Signature line. The year comes from the build, so it moves on with
            each deploy rather than being written into the markup. */}
        <p className="pb-12 text-center font-source-serif italic tracking-[0.12em] text-sm text-dark">
          Made with love by Lolikar © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
