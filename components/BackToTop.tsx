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
      className={`fixed bottom-8 right-8 z-50 grid h-[38px] w-[38px] sm:h-14 sm:w-14 place-items-center rounded-full bg-[#D5BA54] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#C4A845] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark ${
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
