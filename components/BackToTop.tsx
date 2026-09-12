"use client";

import { useEffect, useRef, useState } from "react";

/** How far down the button starts being offered, in px. */
const APPEARS_AFTER = 400;
/** How long after the last scroll it fades away again, in ms. */
const IDLE_TIMEOUT = 1500;
/** Its resting distance from the bottom and the right of the window, in px. */
const GAP = 32;

/** Riding with the window, or resting on the footer's row of icons. */
type Place = { mode: "fixed"; bottom: number } | { mode: "absolute"; top: number };

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  // Normally GAP from the bottom of the window. Near the end of the page it
  // comes to rest on the footer instead of riding down over the icons and the
  // signature.
  //
  // Resting, it is placed on the page rather than on the window — card #108.
  // It used to stay fixed and have its distance from the bottom worked out
  // again on every scroll event, and on a phone that is exactly what shook:
  // when Safari springs back at the end of the page the page moves on its
  // own, the new distance arrives a frame behind it, and the button chases
  // the icons. Anchored to the page it moves with them with nothing to
  // compute. Where the two modes meet they put it in the same spot, so the
  // hand-over cannot be seen.
  const [place, setPlace] = useState<Place>({ mode: "fixed", bottom: GAP });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // It only shows while the page is actually moving: standing still — and
    // especially resting at the bottom, on the social icons — it fades out
    // rather than sitting over the page asking to be looked at.
    const hideSoon = () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setVisible(false), IDLE_TIMEOUT);
    };

    // Where it stops, off to the right of the row of social icons and level
    // with their middle, at every width — card #92 asks for the button and the
    // icons to be on one line. From sm they are also one size; on a phone the
    // button is back to 30px against the icons' 44 (card #110), and it still
    // centres on them there. Measured off an icon rather than its row, whose
    // padding sits above the icons themselves.
    const update = () => {
      const icon = document.querySelector<HTMLElement>("[data-footer-icons] a");
      const fixed: Place = { mode: "fixed", bottom: GAP };
      if (!icon) return setPlace(fixed);
      const box = icon.getBoundingClientRect();
      const half = (buttonRef.current?.offsetHeight ?? 0) / 2;
      const restingBottom = window.innerHeight - (box.top + box.height / 2 + half);
      // Where the icons sit on the page, read from the layout rather than from
      // the window: offsetTop does not change while the page scrolls or
      // springs, where the scroll position and the box on screen can briefly
      // disagree on a phone mid-bounce. So repeating this hands React the same
      // number and nothing moves.
      let pageTop = 0;
      for (let el: HTMLElement | null = icon; el; el = el.offsetParent as HTMLElement | null) {
        pageTop += el.offsetTop;
      }
      const next: Place =
        restingBottom > GAP
          ? { mode: "absolute", top: Math.round((pageTop + icon.offsetHeight / 2 - half) * 2) / 2 }
          : fixed;
      setPlace((prev) =>
        prev.mode === next.mode &&
        (prev.mode === "fixed" ? prev.bottom === (next as typeof prev).bottom : prev.top === (next as typeof prev).top)
          ? prev
          : next
      );
    };

    const onScroll = () => {
      setVisible(window.scrollY > APPEARS_AFTER);
      update();
      hideSoon();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={place.mode === "fixed" ? { bottom: place.bottom } : { top: place.top }}
      /* 30px on a phone again — card #110, which takes back the phone half of
         card #92: the button there is to be the size it was before, and only
         from sm the size of the social icons. */
      className={`${place.mode} right-5 sm:right-[54px] z-50 grid h-[30px] w-[30px] sm:h-[55px] sm:w-[55px] place-items-center rounded-full bg-[#D5BA54] text-white shadow-lg transition-[opacity,background-color,transform] duration-300 hover:-translate-y-1 hover:bg-[#C4A845] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* The chevron is the one drawn on card #92, point for point, in the
          button's own 55-unit box: wider and steeper than the one it replaces,
          with a 3-unit stroke. Kept in its box so it scales with the button —
          30px on a phone, 55 from sm. */}
      <svg
        className="h-full w-full"
        viewBox="0 0 55 55"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M41.85 33.478L27.5 16.739L13.15 33.478" />
      </svg>
    </button>
  );
}
