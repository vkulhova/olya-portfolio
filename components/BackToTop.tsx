"use client";

import { useEffect, useRef, useState } from "react";

/** How far down the button starts being offered, in px. */
const APPEARS_AFTER = 400;
/** How long after the last scroll it fades away again, in ms. */
const IDLE_TIMEOUT = 1500;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // It only shows while the page is actually moving: standing still — and
    // especially resting at the bottom, on the social icons — it fades out
    // rather than sitting over the page asking to be looked at.
    const hideSoon = () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setVisible(false), IDLE_TIMEOUT);
    };

    const onScroll = () => {
      setVisible(window.scrollY > APPEARS_AFTER);
      hideSoon();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 grid h-11 w-11 sm:h-14 sm:w-14 place-items-center rounded-full bg-peach-mid text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#F5735E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* A single chevron, drawn with the same soft round ends as the rest of
          the line work. The stroke is left slightly uneven so it keeps the
          hand-made feel of the illustrations. */}
      <svg
        className="h-[15px] w-[19px] sm:h-[18px] sm:w-[23px]"
        viewBox="0 0 23 18"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.2 14.4C5.4 10.2 8.6 6.2 11.5 3.2C14.3 6.1 17.6 10.1 20.8 14.4" />
      </svg>
    </button>
  );
}
