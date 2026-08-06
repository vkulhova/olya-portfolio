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
      className={`fixed bottom-8 right-8 z-50 grid h-11 w-11 sm:h-14 sm:w-14 place-items-center rounded-full bg-gold-light text-dark shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Slightly wobbly arrow, drawn to match the hand-made feel of the illustrations */}
      <svg
        className="h-[19px] w-[17px] sm:h-6 sm:w-[22px]"
        viewBox="0 0 22 24"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 21C10.4 16 10.7 8.6 11.2 3.4" />
        <path d="M4 10.2C6.4 7.6 9 4.8 11.2 3C13.2 4.9 15.8 7.6 18 10" />
      </svg>
    </button>
  );
}
