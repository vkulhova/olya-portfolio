import DecorativeDots from "./DecorativeDots";

const socials = [
  { name: "Behance",   href: "https://www.behance.net/nikolska",                        icon: "/svg/social-behance.svg" },
  { name: "Instagram", href: "https://www.instagram.com/by.lolikar",                   icon: "/svg/social-instagram.svg" },
  { name: "Pinterest", href: "https://de.pinterest.com/olikanikolskaia/",              icon: "/svg/social-pinterest.svg" },
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/olika-nikolska-5222b23b0/",  icon: "/svg/social-linkedin.svg" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="h-9 bg-white" />
      <DecorativeDots />

      <div className="flex justify-center gap-4 py-12">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            className="w-10 h-10 hover:opacity-80 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.icon} alt={s.name} className="w-full h-full object-contain" />
          </a>
        ))}
      </div>
    </footer>
  );
}
