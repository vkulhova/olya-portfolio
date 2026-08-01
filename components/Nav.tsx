"use client";

import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "./Language";
import { useView } from "./View";

const LINKS = ["portfolio", "about", "contact"] as const;

export default function Nav() {
  // Which section is on screen — the links are plain hash links, and the view
  // follows the hash, so nothing here has to intercept the click.
  const view = useView();
  // Once the bar is pinned, a small logo joins it — the big one has scrolled away by then.
  const [stuck, setStuck] = useState(false);
  // Phones only: the links fold into a burger while the bar is pinned.
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setStuck((navRef.current?.getBoundingClientRect().top ?? 1) <= 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    // The shadow is tinted with the site's brown rather than black, and only
    // appears once the bar is pinned — before that it has nothing to cast onto.
    <nav
      ref={navRef}
      className={`sticky top-0 z-40 bg-white flex items-center justify-center gap-10 py-[29px] min-h-[78px] transition-shadow duration-300 ${
        stuck ? "shadow-[0_2px_8px_rgba(60,26,5,0.05)]" : "shadow-none"
      }`}
    >
      {/* Absolutely placed so it never nudges the centred links. On phones it
          only has room once the links have folded into the menu, which is the
          same moment it appears. */}
      <a
        href="#home"
        aria-label="Lolikar — home"
        className={`absolute left-8 top-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-100 ${
          stuck ? "sm:opacity-100" : "sm:pointer-events-none sm:opacity-0"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/svg/lolikar.svg" alt="Lolikar" className="h-[47px] w-auto" />
      </a>

      {/* Inline links — from sm up. On phones they live in the burger menu. */}
      <div className="hidden sm:flex gap-10">
        {LINKS.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            aria-current={view === link ? "page" : undefined}
            className={`font-futura font-semibold text-sm tracking-[0.25em] uppercase transition-colors hover:text-gold ${
              view === link ? "text-gold" : "text-dark"
            }`}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Mirrors the logo on the left, and fades in with it: before the bar
          pins, the switcher at the top of the header is the visible one. */}
      <LanguageSwitcher
        className={`absolute right-8 top-1/2 -translate-y-1/2 hidden sm:flex transition-opacity duration-300 ${
          stuck ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Burger — phones only, present from the top of the page */}
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((v) => !v)}
        className="absolute right-8 top-1/2 -translate-y-1/2 sm:hidden grid h-12 w-12 place-items-center text-dark"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true" fill="none"
          stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          {menuOpen ? (
            <>
              <path d="M5 5l14 14" />
              <path d="M19 5L5 19" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      {/* Menu panel — sits under the bar, so it moves with it while pinned */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full sm:hidden bg-white shadow-[0_6px_12px_rgba(60,26,5,0.06)]"
        >
          <div className="flex flex-col items-center gap-6 py-8">
            {LINKS.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => setMenuOpen(false)}
                aria-current={view === link ? "page" : undefined}
                className={`font-futura font-semibold text-sm tracking-[0.25em] uppercase transition-colors ${
                  view === link ? "text-gold" : "text-dark"
                }`}
              >
                {link}
              </a>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
