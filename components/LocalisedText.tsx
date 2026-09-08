"use client";

import { useLanguage } from "./Language";

/**
 * Renders one copy block in the selected language.
 *
 * Both versions are handed down from the server and the switch happens here, so
 * changing language costs nothing — no refetch, no reload.
 *
 * A line break starts a new paragraph — one blank line between them or none at
 * all, whichever the author typed. The split used to want a blank line, and the
 * About copy in Studio is written with single breaks, so its three paragraphs
 * were collapsing into one long block: the whitespace pass below turned each
 * break into a space. Card #66, where the drawing shows three.
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

  const paragraphs = source
    .split(/\r?\n(?:[ \t]*\r?\n)*/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

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
