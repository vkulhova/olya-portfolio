"use client";

import { useEffect, useState } from "react";

const LINKS = ["portfolio", "about", "contact"] as const;
type Section = (typeof LINKS)[number];

/** Height of the pinned bar — the line that decides which section we are "on". */
const BAR_HEIGHT = 60;

export default function Nav() {
  const [active, setActive] = useState<Section>(LINKS[0]);

  useEffect(() => {
    const onScroll = () => {
      // The last section whose top has passed under the bar is the one we're in.
      // At the very top nothing has passed yet, so the first link stays lit.
      let current: Section = LINKS[0];
      for (const id of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= BAR_HEIGHT + 1) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-white flex justify-center gap-10 py-5">
      {LINKS.map((link) => (
        <a
          key={link}
          href={`#${link}`}
          aria-current={active === link ? "page" : undefined}
          className={`font-futura font-bold text-sm tracking-[0.25em] uppercase transition-colors hover:text-gold ${
            active === link ? "text-gold" : "text-dark"
          }`}
        >
          {link}
        </a>
      ))}
    </nav>
  );
}
