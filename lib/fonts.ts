/** Every face Studio may choose from, and how each one is asked for.
 *
 *  Two things are true of all of them and must stay true of anything added:
 *
 *  1. They carry Ukrainian, not merely Cyrillic. The site is bilingual, and a
 *     Latin-only face — Outfit, Poppins, Lato among them — silently drops the
 *     Ukrainian version onto whatever sans the device happens to own. Every
 *     entry below was fetched from the Google Fonts API and kept only if its
 *     CSS carries U+0400-045F and U+0490-0491 — the second is ґ, which is the
 *     one Ukrainian letter a Cyrillic face can plausibly lack — alongside the
 *     Latin range.
 *  2. They answer to wght@300;400;500. Faces that ship fewer weights, such as
 *     Pacifico, are served their single weight rather than an error, so the
 *     one spec is safe for the whole list.
 *
 *  The group is only a label for the Studio dropdown — it groups 80 names into
 *  something a person can scan.
 */
export type FontChoice = { css: string; google: string; group: string };

export const FONT_CHOICES: Record<string, FontChoice> = {
  // Sans
  "Alegreya Sans": { css: "'Alegreya Sans', sans-serif", google: "Alegreya+Sans:wght@300;400;500", group: "Sans" },
  "Arsenal": { css: "'Arsenal', sans-serif", google: "Arsenal:wght@300;400;500", group: "Sans" },
  "Commissioner": { css: "'Commissioner', sans-serif", google: "Commissioner:wght@300;400;500", group: "Sans" },
  "Cuprum": { css: "'Cuprum', sans-serif", google: "Cuprum:wght@300;400;500", group: "Sans" },
  "Didact Gothic": { css: "'Didact Gothic', sans-serif", google: "Didact+Gothic:wght@300;400;500", group: "Sans" },
  "Exo 2": { css: "'Exo 2', sans-serif", google: "Exo+2:wght@300;400;500", group: "Sans" },
  "Fira Sans": { css: "'Fira Sans', sans-serif", google: "Fira+Sans:wght@300;400;500", group: "Sans" },
  "Forum": { css: "'Forum', sans-serif", google: "Forum:wght@300;400;500", group: "Sans" },
  "Geologica": { css: "'Geologica', sans-serif", google: "Geologica:wght@300;400;500", group: "Sans" },
  "Golos Text": { css: "'Golos Text', sans-serif", google: "Golos+Text:wght@300;400;500", group: "Sans" },
  "IBM Plex Sans": { css: "'IBM Plex Sans', sans-serif", google: "IBM+Plex+Sans:wght@300;400;500", group: "Sans" },
  "Inter": { css: "'Inter', sans-serif", google: "Inter:wght@300;400;500", group: "Sans" },
  "Jost": { css: "'Jost', sans-serif", google: "Jost:wght@300;400;500", group: "Sans" },
  "Manrope": { css: "'Manrope', sans-serif", google: "Manrope:wght@300;400;500", group: "Sans" },
  "Marmelad": { css: "'Marmelad', sans-serif", google: "Marmelad:wght@300;400;500", group: "Sans" },
  "Montserrat": { css: "'Montserrat', sans-serif", google: "Montserrat:wght@300;400;500", group: "Sans" },
  "Mulish": { css: "'Mulish', sans-serif", google: "Mulish:wght@300;400;500", group: "Sans" },
  "Noto Sans": { css: "'Noto Sans', sans-serif", google: "Noto+Sans:wght@300;400;500", group: "Sans" },
  "Nunito": { css: "'Nunito', sans-serif", google: "Nunito:wght@300;400;500", group: "Sans" },
  "Nunito Sans": { css: "'Nunito Sans', sans-serif", google: "Nunito+Sans:wght@300;400;500", group: "Sans" },
  "Onest": { css: "'Onest', sans-serif", google: "Onest:wght@300;400;500", group: "Sans" },
  "Open Sans": { css: "'Open Sans', sans-serif", google: "Open+Sans:wght@300;400;500", group: "Sans" },
  "Oswald": { css: "'Oswald', sans-serif", google: "Oswald:wght@300;400;500", group: "Sans" },
  "PT Sans": { css: "'PT Sans', sans-serif", google: "PT+Sans:wght@300;400;500", group: "Sans" },
  "PT Sans Narrow": { css: "'PT Sans Narrow', sans-serif", google: "PT+Sans+Narrow:wght@300;400;500", group: "Sans" },
  "Play": { css: "'Play', sans-serif", google: "Play:wght@300;400;500", group: "Sans" },
  "Poiret One": { css: "'Poiret One', sans-serif", google: "Poiret+One:wght@300;400;500", group: "Sans" },
  "Raleway": { css: "'Raleway', sans-serif", google: "Raleway:wght@300;400;500", group: "Sans" },
  "Roboto": { css: "'Roboto', sans-serif", google: "Roboto:wght@300;400;500", group: "Sans" },
  "Rubik": { css: "'Rubik', sans-serif", google: "Rubik:wght@300;400;500", group: "Sans" },
  "Ruda": { css: "'Ruda', sans-serif", google: "Ruda:wght@300;400;500", group: "Sans" },
  "Scada": { css: "'Scada', sans-serif", google: "Scada:wght@300;400;500", group: "Sans" },
  "Source Sans 3": { css: "'Source Sans 3', sans-serif", google: "Source+Sans+3:wght@300;400;500", group: "Sans" },
  "Tenor Sans": { css: "'Tenor Sans', sans-serif", google: "Tenor+Sans:wght@300;400;500", group: "Sans" },
  "Ubuntu": { css: "'Ubuntu', sans-serif", google: "Ubuntu:wght@300;400;500", group: "Sans" },
  "Wix Madefor Display": { css: "'Wix Madefor Display', sans-serif", google: "Wix+Madefor+Display:wght@300;400;500", group: "Sans" },
  "Yanone Kaffeesatz": { css: "'Yanone Kaffeesatz', sans-serif", google: "Yanone+Kaffeesatz:wght@300;400;500", group: "Sans" },
  "Ysabeau": { css: "'Ysabeau', sans-serif", google: "Ysabeau:wght@300;400;500", group: "Sans" },
  // Rounded
  "Comfortaa": { css: "'Comfortaa', sans-serif", google: "Comfortaa:wght@300;400;500", group: "Rounded" },
  "Unbounded": { css: "'Unbounded', sans-serif", google: "Unbounded:wght@300;400;500", group: "Rounded" },
  // Serif
  "Alegreya": { css: "'Alegreya', serif", google: "Alegreya:wght@300;400;500", group: "Serif" },
  "Alice": { css: "'Alice', serif", google: "Alice:wght@300;400;500", group: "Serif" },
  "Andika": { css: "'Andika', serif", google: "Andika:wght@300;400;500", group: "Serif" },
  "Bitter": { css: "'Bitter', serif", google: "Bitter:wght@300;400;500", group: "Serif" },
  "Cormorant": { css: "'Cormorant', serif", google: "Cormorant:wght@300;400;500", group: "Serif" },
  "Cormorant Garamond": { css: "'Cormorant Garamond', serif", google: "Cormorant+Garamond:wght@300;400;500", group: "Serif" },
  "Cormorant Infant": { css: "'Cormorant Infant', serif", google: "Cormorant+Infant:wght@300;400;500", group: "Serif" },
  "Cormorant SC": { css: "'Cormorant SC', serif", google: "Cormorant+SC:wght@300;400;500", group: "Serif" },
  "EB Garamond": { css: "'EB Garamond', serif", google: "EB+Garamond:wght@300;400;500", group: "Serif" },
  "Kurale": { css: "'Kurale', serif", google: "Kurale:wght@300;400;500", group: "Serif" },
  "Literata": { css: "'Literata', serif", google: "Literata:wght@300;400;500", group: "Serif" },
  "Lora": { css: "'Lora', serif", google: "Lora:wght@300;400;500", group: "Serif" },
  "Merriweather": { css: "'Merriweather', serif", google: "Merriweather:wght@300;400;500", group: "Serif" },
  "Noto Serif": { css: "'Noto Serif', serif", google: "Noto+Serif:wght@300;400;500", group: "Serif" },
  "Old Standard TT": { css: "'Old Standard TT', serif", google: "Old+Standard+TT:wght@300;400;500", group: "Serif" },
  "PT Serif": { css: "'PT Serif', serif", google: "PT+Serif:wght@300;400;500", group: "Serif" },
  "PT Serif Caption": { css: "'PT Serif Caption', serif", google: "PT+Serif+Caption:wght@300;400;500", group: "Serif" },
  "Philosopher": { css: "'Philosopher', serif", google: "Philosopher:wght@300;400;500", group: "Serif" },
  "Playfair Display": { css: "'Playfair Display', serif", google: "Playfair+Display:wght@300;400;500", group: "Serif" },
  "Playfair Display SC": { css: "'Playfair Display SC', serif", google: "Playfair+Display+SC:wght@300;400;500", group: "Serif" },
  "Podkova": { css: "'Podkova', serif", google: "Podkova:wght@300;400;500", group: "Serif" },
  "Prata": { css: "'Prata', serif", google: "Prata:wght@300;400;500", group: "Serif" },
  "Source Serif 4": { css: "'Source Serif 4', serif", google: "Source+Serif+4:wght@300;400;500", group: "Serif" },
  "Spectral": { css: "'Spectral', serif", google: "Spectral:wght@300;400;500", group: "Serif" },
  "Tinos": { css: "'Tinos', serif", google: "Tinos:wght@300;400;500", group: "Serif" },
  "Vollkorn": { css: "'Vollkorn', serif", google: "Vollkorn:wght@300;400;500", group: "Serif" },
  // Display
  "Amatic SC": { css: "'Amatic SC', cursive", google: "Amatic+SC:wght@300;400;500", group: "Display" },
  "Bad Script": { css: "'Bad Script', cursive", google: "Bad+Script:wght@300;400;500", group: "Display" },
  "Caveat": { css: "'Caveat', cursive", google: "Caveat:wght@300;400;500", group: "Display" },
  "Gabriela": { css: "'Gabriela', cursive", google: "Gabriela:wght@300;400;500", group: "Display" },
  "Kelly Slab": { css: "'Kelly Slab', cursive", google: "Kelly+Slab:wght@300;400;500", group: "Display" },
  "Lobster": { css: "'Lobster', cursive", google: "Lobster:wght@300;400;500", group: "Display" },
  "Marck Script": { css: "'Marck Script', cursive", google: "Marck+Script:wght@300;400;500", group: "Display" },
  "Neucha": { css: "'Neucha', cursive", google: "Neucha:wght@300;400;500", group: "Display" },
  "Pacifico": { css: "'Pacifico', cursive", google: "Pacifico:wght@300;400;500", group: "Display" },
  "Pangolin": { css: "'Pangolin', cursive", google: "Pangolin:wght@300;400;500", group: "Display" },
  "Ruslan Display": { css: "'Ruslan Display', cursive", google: "Ruslan+Display:wght@300;400;500", group: "Display" },
  "Seymour One": { css: "'Seymour One', cursive", google: "Seymour+One:wght@300;400;500", group: "Display" },
  "Underdog": { css: "'Underdog', cursive", google: "Underdog:wght@300;400;500", group: "Display" },
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
