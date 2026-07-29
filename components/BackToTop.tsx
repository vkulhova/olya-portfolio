"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 grid h-14 w-14 place-items-center rounded-full bg-gold-light text-dark shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Slightly wobbly arrow, drawn to match the hand-made feel of the illustrations */}
      <svg
        width="22"
        height="24"
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
