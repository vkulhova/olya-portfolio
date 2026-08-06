"use client";

import { useEffect, useRef } from "react";

/** Sizes the About copy so it never runs past the bottom of the photo, and
 *  decides when the two have to stop sitting side by side.
 *
 *  The photo keeps its own 3:4 ratio at every width — it is never cropped — so
 *  as the column narrows the picture gets shorter while the text gets taller.
 *  Rather than pick a font size per breakpoint by hand (which the next edit in
 *  Studio would invalidate), the copy is measured: it starts at MAX and steps
 *  down until it fits, or until MIN, whichever comes first.
 *
 *  Below MIN the text would be too small to read, so the columns stack instead
 *  and the copy goes back to full size. That threshold is measured too — it is
 *  wherever this particular text stops fitting, not a width guessed in advance.
 */
const MAX = 16;
const MIN = 11;
const STEP = 0.25;
/** Tailwind's md:, below which the grid is a single column anyway. */
const SIDE_BY_SIDE = 768;

export default function AboutCopyFit({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const photo = document.querySelector<HTMLElement>("[data-about-photo]");
    const grid = photo?.closest<HTMLElement>("[data-about-grid]");

    const fit = () => {
      if (!photo || !grid) return;

      // Always measure from the side-by-side layout, so a window that widens
      // again is given the chance to come out of the stacked one.
      grid.removeAttribute("data-about-stacked");

      if (window.innerWidth < SIDE_BY_SIDE) {
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

      if (el.getBoundingClientRect().bottom > limit) {
        // Even at MIN it does not fit: stack, at full size.
        grid.setAttribute("data-about-stacked", "");
        el.style.removeProperty("--about-fs");
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
    // Text measured in a fallback font wraps differently once the real one
    // arrives — including the Ukrainian face, which is only fetched when the
    // language is first switched, well after the initial fit.
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener("loadingdone", fit);

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", fit);
      document.fonts?.removeEventListener("loadingdone", fit);
    };
  }, []);

  // Keeps the paragraph spacing the column's own gap used to give them.
  return (
    <div ref={ref} className="flex flex-col gap-5">
      {children}
    </div>
  );
}
