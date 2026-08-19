"use client";

import { useEffect, useRef, useState } from "react";

/** How far down the button starts being offered, in px. */
const APPEARS_AFTER = 400;
/** How long after the last scroll it fades away again, in ms. */
const IDLE_TIMEOUT = 1500;
/** Its resting distance from the bottom and the right of the window, in px. */
const GAP = 32;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  // Distance from the bottom of the window. Normally GAP; near the end of the
  // page it grows so the button comes to rest on the footer instead of riding
  // down over the icons and the signature.
  const [bottom, setBottom] = useState(GAP);
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

    // Where it stops, off to the right of the row of social icons: on phones
    // resting on the icons' top edge, from sm up level with their middle —
    // the button and the icons are both 36px there, so matching the two
    // centres lines the row up exactly. Phones still differ: the icons are
    // 44px against a 30px button. Measured off an icon rather than its row,
    // whose padding sits above the icons themselves.
    const place = () => {
      const icon = document.querySelector<HTMLElement>("[data-footer-icons] a");
      if (!icon) return setBottom(GAP);
      const box = icon.getBoundingClientRect();
      const wide = window.matchMedia("(min-width: 640px)").matches;
      const target = wide
        ? box.top + box.height / 2 + (buttonRef.current?.offsetHeight ?? 0) / 2
        : box.top;
      setBottom(Math.max(GAP, window.innerHeight - target));
    };

    const onScroll = () => {
      setVisible(window.scrollY > APPEARS_AFTER);
      place();
      hideSoon();
    };

    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", place);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{ bottom }}
      className={`fixed right-5 sm:right-8 z-50 grid h-[30px] w-[30px] sm:h-9 sm:w-9 place-items-center rounded-full bg-[#D5BA54] text-white shadow-lg transition-[opacity,background-color,transform] duration-300 hover:-translate-y-1 hover:bg-[#C4A845] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* The chevron and its stroke come from the supplied drawing, kept in its
          own 43-unit box so both scale with the button rather than being fixed
          to one size. */}
      <svg
        className="h-full w-full"
        viewBox="0 0 43 43"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M31 25L21.5 15.5L12 25" />
      </svg>
    </button>
  );
}
