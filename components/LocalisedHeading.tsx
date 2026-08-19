"use client";

import { useLanguage } from "./Language";

/**
 * The handwritten headings are drawings, not text, so each one ships as two
 * files. This picks the one for the selected language — same switch as the
 * copy, and just as free: both are static assets, nothing is refetched.
 */
export default function LocalisedHeading({
  en,
  uk,
  altEn,
  altUk,
  className = "",
  ukClassName,
}: {
  en: string;
  uk: string;
  altEn: string;
  altUk: string;
  className?: string;
  /** The Ukrainian lettering has taller ascenders and descenders, so at an
   *  equal box height it reads smaller than the English. Each heading passes
   *  its own size here to even them out. The sizes are not guesswork: each
   *  pair was measured by the height of the band the strokes actually fill —
   *  its x-height rather than the full drawing — and the Ukrainian box scaled
   *  until the two match. */
  ukClassName?: string;
}) {
  const isUk = useLanguage() === "UA";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={isUk ? uk : en}
      alt={isUk ? altUk : altEn}
      className={isUk ? ukClassName ?? className : className}
    />
  );
}
