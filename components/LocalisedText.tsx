"use client";

import { useLanguage } from "./Language";

/**
 * Renders one copy block in the selected language.
 *
 * Both versions are handed down from the server and the switch happens here, so
 * changing language costs nothing — no refetch, no reload.
 *
 * Blank lines separate paragraphs. That is what the Studio fields ask for, and
 * it is how the text was written in the first place.
 */
export default function LocalisedText({
  en,
  uk,
  className = "",
}: {
  en: string;
  uk: string | null;
  className?: string;
}) {
  const language = useLanguage();
  // An empty or missing translation falls back to English rather than leaving
  // the block blank while it is being written.
  const source = (language === "UA" && uk?.trim() ? uk : en).trim();

  const paragraphs = source.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim());

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={className}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
