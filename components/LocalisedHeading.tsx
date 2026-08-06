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
}: {
  en: string;
  uk: string;
  altEn: string;
  altUk: string;
  className?: string;
}) {
  const isUk = useLanguage() === "UA";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={isUk ? uk : en} alt={isUk ? altUk : altEn} className={className} />
  );
}
