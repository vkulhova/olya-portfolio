"use client";

import { useEffect, useRef } from "react";

/** Sizes the About copy so it never runs past the bottom of the photo.
 *
 *  The photo keeps its own 3:4 ratio at every width — it is never cropped — so
 *  as the column narrows the picture gets shorter while the text gets taller.
 *  Rather than pick a font size per breakpoint by hand (which the next edit in
 *  Studio would invalidate), the copy is measured: it starts at MAX and steps
 *  down until it fits, or until MIN, whichever comes first.
 *
 *  Only while the two sit side by side. Once the columns stack there is no
 *  photo to stay inside and the copy goes back to full size.
 */
const MAX = 16;
const MIN = 11;
const STEP = 0.25;
/** Matches Tailwind's lg:, where About switches to two columns. */
const SIDE_BY_SIDE = 1024;

export default function AboutCopyFit({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const photo = document.querySelector<HTMLElement>("[data-about-photo]");

    const fit = () => {
      if (!photo || window.innerWidth < SIDE_BY_SIDE) {
        el.style.removeProperty("--about-fs");
        return;
      }
      // The photo's height comes from its column width, not from the row, so
      // shrinking the text below never moves this limit — no feedback loop.
      const limit = photo.getBoundingClientRect().bottom;
      let size = MAX;
      el.style.setProperty("--about-fs", `${size}px`);
      while (size > MIN && el.getBoundingClientRect().bottom > limit) {
        size -= STEP;
        el.style.setProperty("--about-fs", `${size}px`);
      }
    };

    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(photo ?? el);
    // The observer covers the column narrowing; this covers the breakpoint
    // itself, where the photo's own size may not change at all.
    window.addEventListener("resize", fit);
    // The language switch swaps the copy for a translation of a different length.
    const mo = new MutationObserver(fit);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    // Text measured in a fallback font wraps differently once Outfit arrives.
    document.fonts?.ready.then(fit);

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  // Keeps the paragraph spacing the column's own gap used to give them.
  return (
    <div ref={ref} className="flex flex-col gap-5">
      {children}
    </div>
  );
}
