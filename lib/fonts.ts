/** Every face Studio may choose from, and how each one is asked for.
 *
 *  Two things are true of all of them and must stay true of anything added:
 *
 *  1. They carry Cyrillic. The site is bilingual, and a Latin-only face —
 *     Outfit and Poppins among them — silently drops the Ukrainian version
 *     onto whatever sans the device happens to own. Every entry below was
 *     checked against the Google Fonts API for a U+04xx unicode-range before
 *     it was let in.
 *  2. They answer to wght@300;400;500. Faces that ship fewer weights, such as
 *     Pacifico, are served their single weight rather than an error, so the
 *     one spec is safe for the whole list.
 *
 *  The group is only a label for the Studio dropdown — it groups 41 names into
 *  something a person can scan.
 */
export type FontChoice = { css: string; google: string; group: string };

export const FONT_CHOICES: Record<string, FontChoice> = {
  // Sans
  "Alegreya Sans": { css: "'Alegreya Sans', sans-serif", google: "Alegreya+Sans:wght@300;400;500", group: "Sans" },
  "Commissioner": { css: "'Commissioner', sans-serif", google: "Commissioner:wght@300;400;500", group: "Sans" },
  "Geologica": { css: "'Geologica', sans-serif", google: "Geologica:wght@300;400;500", group: "Sans" },
  "Golos Text": { css: "'Golos Text', sans-serif", google: "Golos+Text:wght@300;400;500", group: "Sans" },
  "Inter": { css: "'Inter', sans-serif", google: "Inter:wght@300;400;500", group: "Sans" },
  "Jost": { css: "'Jost', sans-serif", google: "Jost:wght@300;400;500", group: "Sans" },
  "Manrope": { css: "'Manrope', sans-serif", google: "Manrope:wght@300;400;500", group: "Sans" },
  "Montserrat": { css: "'Montserrat', sans-serif", google: "Montserrat:wght@300;400;500", group: "Sans" },
  "Noto Sans": { css: "'Noto Sans', sans-serif", google: "Noto+Sans:wght@300;400;500", group: "Sans" },
  "Nunito Sans": { css: "'Nunito Sans', sans-serif", google: "Nunito+Sans:wght@300;400;500", group: "Sans" },
  "Onest": { css: "'Onest', sans-serif", google: "Onest:wght@300;400;500", group: "Sans" },
  "Open Sans": { css: "'Open Sans', sans-serif", google: "Open+Sans:wght@300;400;500", group: "Sans" },
  "Oswald": { css: "'Oswald', sans-serif", google: "Oswald:wght@300;400;500", group: "Sans" },
  "PT Sans": { css: "'PT Sans', sans-serif", google: "PT+Sans:wght@300;400;500", group: "Sans" },
  "Play": { css: "'Play', sans-serif", google: "Play:wght@300;400;500", group: "Sans" },
  "Raleway": { css: "'Raleway', sans-serif", google: "Raleway:wght@300;400;500", group: "Sans" },
  "Roboto": { css: "'Roboto', sans-serif", google: "Roboto:wght@300;400;500", group: "Sans" },
  "Rubik": { css: "'Rubik', sans-serif", google: "Rubik:wght@300;400;500", group: "Sans" },
  "Source Sans 3": { css: "'Source Sans 3', sans-serif", google: "Source+Sans+3:wght@300;400;500", group: "Sans" },
  // Rounded
  "Comfortaa": { css: "'Comfortaa', sans-serif", google: "Comfortaa:wght@300;400;500", group: "Rounded" },
  "Unbounded": { css: "'Unbounded', sans-serif", google: "Unbounded:wght@300;400;500", group: "Rounded" },
  // Serif
  "Alegreya": { css: "'Alegreya', serif", google: "Alegreya:wght@300;400;500", group: "Serif" },
  "Bitter": { css: "'Bitter', serif", google: "Bitter:wght@300;400;500", group: "Serif" },
  "Cormorant Garamond": { css: "'Cormorant Garamond', serif", google: "Cormorant+Garamond:wght@300;400;500", group: "Serif" },
  "EB Garamond": { css: "'EB Garamond', serif", google: "EB+Garamond:wght@300;400;500", group: "Serif" },
  "Literata": { css: "'Literata', serif", google: "Literata:wght@300;400;500", group: "Serif" },
  "Lora": { css: "'Lora', serif", google: "Lora:wght@300;400;500", group: "Serif" },
  "Merriweather": { css: "'Merriweather', serif", google: "Merriweather:wght@300;400;500", group: "Serif" },
  "Noto Serif": { css: "'Noto Serif', serif", google: "Noto+Serif:wght@300;400;500", group: "Serif" },
  "PT Serif": { css: "'PT Serif', serif", google: "PT+Serif:wght@300;400;500", group: "Serif" },
  "Philosopher": { css: "'Philosopher', serif", google: "Philosopher:wght@300;400;500", group: "Serif" },
  "Playfair Display": { css: "'Playfair Display', serif", google: "Playfair+Display:wght@300;400;500", group: "Serif" },
  "Podkova": { css: "'Podkova', serif", google: "Podkova:wght@300;400;500", group: "Serif" },
  "Spectral": { css: "'Spectral', serif", google: "Spectral:wght@300;400;500", group: "Serif" },
  "Vollkorn": { css: "'Vollkorn', serif", google: "Vollkorn:wght@300;400;500", group: "Serif" },
  // Display
  "Amatic SC": { css: "'Amatic SC', cursive", google: "Amatic+SC:wght@300;400;500", group: "Display" },
  "Caveat": { css: "'Caveat', cursive", google: "Caveat:wght@300;400;500", group: "Display" },
  "Marck Script": { css: "'Marck Script', cursive", google: "Marck+Script:wght@300;400;500", group: "Display" },
  "Pacifico": { css: "'Pacifico', cursive", google: "Pacifico:wght@300;400;500", group: "Display" },
  "Ruslan Display": { css: "'Ruslan Display', cursive", google: "Ruslan+Display:wght@300;400;500", group: "Display" },
  "Yeseva One": { css: "'Yeseva One', cursive", google: "Yeseva+One:wght@300;400;500", group: "Display" },
};

/** The dropdown Studio shows. Built from the map above so the three font
 *  fields cannot drift apart — they used to hold three hand-written copies of
 *  the same list. `emptyTitle` is what the first, unset option says. */
export function fontOptions(emptyTitle: string) {
  return [
    { title: emptyTitle, value: "" },
    ...Object.entries(FONT_CHOICES).map(([name, f]) => ({
      title: `${f.group} · ${name}`,
      value: name,
    })),
  ];
}
