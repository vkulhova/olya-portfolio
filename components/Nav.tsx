"use client";

import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher, useLanguage } from "./Language";
import { useView } from "./View";
import BrandLogo, { type Brand } from "./BrandLogo";

const LINKS = ["portfolio", "about", "contact"] as const;

/** Lower case: the links are uppercased by their own styling. */
const LABELS = {
  EN: { portfolio: "portfolio", about: "about", contact: "contact" },
  UA: { portfolio: "портфоліо", about: "знайомство", contact: "контакти" },
} as const;

export default function Nav({ brand }: { brand: Brand }) {
  // Which section is on screen — the links are plain hash links, and the view
  // follows the hash, so nothing here has to intercept the click.
  const view = useView();
  const labels = LABELS[useLanguage()];
  // Once the bar is pinned, a small logo joins it — the big one has scrolled away by then.
  const [stuck, setStuck] = useState(false);
  // Phones only: the links fold into a burger while the bar is pinned.
  const [menuOpen, setMenuOpen] = useState(false);
  /* A marker sitting immediately above the bar, in normal flow and one pixel
     tall, pulled back out of the layout by its own negative margin.

     The bar is sticky, so its own rect reads top: 0 both when it is genuinely
     pinned and when the page simply starts at it. On phones nothing is above
     it — the header's logo block is desktop-only and the stripe can be turned
     off in Studio — so `top <= 0` was already true on the first paint, and the
     big wordmark was hidden before the visitor had scrolled anything at all.
     The marker does not move, so "the marker has left the top of the viewport"
     means the page really has scrolled past the bar, which is what the pinned
     styling is about. */
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const marker = sentinelRef.current;
    if (!marker) return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting));
    io.observe(marker);
    return () => io.disconnect();
  }, []);

  return (
    // A fragment, so the bar stays a direct child of <main> and keeps sticking
    // all the way down. The marker above it is one pixel tall and gives that
    // pixel straight back, so nothing below moves.
    <>
      <div ref={sentinelRef} aria-hidden className="h-px -mb-px" />

      {/* The shadow is tinted with the site's brown rather than black, and only
          appears once the bar is pinned — before that it has nothing to cast
          onto.

          On phones the bar has an explicit height in both states rather than a
          height its contents happen to add up to. Card #60: the wordmark used
          to be removed outright the moment the bar pinned, so the bar went from
          139px to 64 in a single frame and everything under it jumped 75px. A
          height can be animated; a child appearing and disappearing cannot. So
          the phone's two logos are both absolute now — they cross-fade in place
          and take no part in the height — and the height itself moves between
          the two figures over the same 300ms the shadow takes. */}
      <nav
        className={`sticky top-0 z-40 bg-white flex items-center justify-center gap-10 py-[29px] min-h-[78px] max-sm:min-h-0 max-sm:py-0 transition-all duration-300 ${
          stuck
            ? "shadow-[0_2px_8px_rgba(60,26,5,0.05)] max-sm:h-[64px]"
            : "shadow-none max-sm:h-[139px]"
        }`}
      >
        {/* Desktop's small logo: absolutely placed so it never nudges the centred
            links, and only present once the bar is pinned and the big one above
            has scrolled away. Phones have their own pair below. */}
        <a
          href="#portfolio"
          aria-label="Lolikar — portfolio"
          className={`hidden sm:block absolute left-8 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            stuck ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {/* The corner takes the L on its own rather than the wordmark. At the
              pinned bar's height the full name had to be set small enough to be
              read as a smudge rather than a name; the single letter holds at
              that size, which is what it was drawn for. */}
          <BrandLogo which="mark" brand={brand} className="h-[47px]" />
        </a>

        {/* Phones, at the top of the page: the full logo, centred and large,
            with the burger out to its left. Absolutely placed so the bar's
            height is the bar's own business rather than this drawing's, and
            faded rather than removed so the swap has something to animate. */}
        <a
          href="#portfolio"
          aria-label="Lolikar — portfolio"
          className={`sm:hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            stuck ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <BrandLogo which="full" brand={brand} className="h-[73px]" />
        </a>

        {/* Phones, once pinned: the wordmark gives way to the L on its own,
            which keeps the pinned bar shallow. The two fade past each other
            rather than one being swapped for the other. */}
        <a
          href="#portfolio"
          aria-label="Lolikar — portfolio"
          aria-hidden={!stuck}
          className={`sm:hidden absolute right-8 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            stuck ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <BrandLogo which="mark" brand={brand} className="h-[44px]" />
        </a>

        {/* Inline links — from sm up. On phones they live in the burger menu.
            50px apart at every width from sm, per card #65; the row used to
            tighten to 24px between sm and md to keep the longer Ukrainian
            labels clear of the pinned logo, and that is checked again below
            rather than assumed. */}
        <div className="hidden sm:flex gap-[50px]">
          {LINKS.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              aria-current={view === link ? "page" : undefined}
              className={`font-chrome font-semibold sm:font-bold text-[13px] sm:text-[12px] tracking-[1.5px] uppercase transition-colors accent-hover ${
                view === link ? "accent-ink" : "text-dark"
              }`}
            >
              {labels[link]}
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
          className="absolute left-8 top-1/2 -translate-y-1/2 sm:hidden grid h-12 w-12 place-items-center text-dark"
        >
          {/* Wider and finer than a stock burger: the lines are set apart so the
              mark reads as three strokes rather than a solid block. The cross
              keeps the same weight. */}
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M2.6 2.6l14.8 14.8" />
              <path d="M17.4 2.6L2.6 17.4" />
            </svg>
          ) : (
            <svg width="30" height="18" viewBox="0 0 30 18" aria-hidden="true" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M1.6 2h26.8" />
              <path d="M1.6 9h26.8" />
              <path d="M1.6 16h26.8" />
            </svg>
          )}
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
                  className={`font-chrome font-semibold sm:font-bold text-[13px] sm:text-[12px] tracking-[1.5px] uppercase transition-colors ${
                    view === link ? "accent-ink" : "text-dark"
                  }`}
                >
                  {labels[link]}
                </a>
              ))}
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
