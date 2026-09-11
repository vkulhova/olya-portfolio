"use client";

import { useEffect } from "react";

/**
 * Keeps the white around the About photo the same under it as beside it —
 * cards #99 and #105.
 *
 * While the photo is floated (md to xl) the copy runs beside it and then
 * closes up underneath. Beside it the gap is the photo's right margin, which
 * is a share of the card and so grows and shrinks smoothly with the window.
 * Underneath, though, a line can only start on the copy's own 24px grid, so
 * the gap there jumped between roughly 17 and 31px as the window changed, and
 * never matched the side. No stylesheet can fix that: the gap depends on where
 * the lines happen to fall.
 *
 * So this measures it. First the photo's bottom margin is set so the first
 * line under the photo lands within half a line of the side gap; then the
 * photo is made taller or shorter by what is left over (under 12px, taken off
 * or added to the crop), so the top of that line's letters sits exactly one
 * side gap below the picture. Neither step changes which lines sit beside the
 * photo and which under it, so the copy does not re-wrap and one pass is
 * exact.
 *
 * Without the script, or outside the float, the stylesheet's own margin and
 * proportion stand, as they did before.
 */
export default function WrapGap() {
  useEffect(() => {
    const box = document.querySelector<HTMLElement>("[data-about-photo]");
    const copy = document.querySelector<HTMLElement>("[data-about-copy]");
    if (!box || !copy) return;
    const context = document.createElement("canvas").getContext("2d");

    // Top of the first line that starts under the photo rather than beside it.
    const firstLineUnder = (photo: DOMRect) => {
      let top = Infinity;
      const paragraphs = copy.querySelectorAll("p");
      for (let i = 0; i < paragraphs.length; i++) {
        const range = document.createRange();
        range.selectNodeContents(paragraphs[i]);
        const rects = range.getClientRects();
        for (let j = 0; j < rects.length; j++) {
          const rect = rects[j];
          if (rect.width > 0 && rect.left < photo.right && rect.top < top) top = rect.top;
        }
      }
      return top;
    };

    const fit = () => {
      box.style.height = "";
      box.style.marginBottom = "";
      if (!context || getComputedStyle(box).float === "none") return;
      const paragraph = copy.querySelector("p");
      if (!paragraph) return;

      const type = getComputedStyle(paragraph);
      const lineHeight = parseFloat(type.lineHeight);
      context.font = `${type.fontStyle} ${type.fontWeight} ${type.fontSize} ${type.fontFamily}`;
      const metrics = context.measureText("Hdfhkl");
      // A line's box is taller than its type; from the top of the box down to
      // the top of the tallest letters.
      const inkDrop = metrics.fontBoundingBoxAscent - metrics.actualBoundingBoxAscent;
      const halfLeading =
        (lineHeight - metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent) / 2;
      const gap = parseFloat(getComputedStyle(box).marginRight);

      // Nothing runs under the photo on this screen: leave it as drawn.
      if (firstLineUnder(box.getBoundingClientRect()) === Infinity) return;

      box.style.marginBottom = `${Math.max(0, gap - halfLeading - inkDrop - lineHeight / 2)}px`;
      const photo = box.getBoundingClientRect();
      const top = firstLineUnder(photo);
      if (top === Infinity) {
        box.style.marginBottom = "";
        return;
      }
      const leftOver = top + inkDrop - photo.bottom - gap;
      if (Math.abs(leftOver) > lineHeight) return;
      box.style.height = `${photo.height + leftOver}px`;
    };

    fit();
    window.addEventListener("resize", fit);
    // The language switch swaps the copy, and the web font can arrive late.
    const observer = new MutationObserver(fit);
    observer.observe(copy, { childList: true, subtree: true, characterData: true });
    document.fonts?.addEventListener("loadingdone", fit);
    document.fonts?.ready.then(fit);

    return () => {
      window.removeEventListener("resize", fit);
      observer.disconnect();
      document.fonts?.removeEventListener("loadingdone", fit);
      box.style.height = "";
      box.style.marginBottom = "";
    };
  }, []);

  return null;
}
