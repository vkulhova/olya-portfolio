import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "v18r1vne",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export type Illustration = {
  _id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
};

/** The four one-off images, each falling back to the file shipped in /public
 *  when nothing has been uploaded. */
export type SiteImage = { url: string; width: number; height: number } | null;

export type SiteImages = {
  avatar: SiteImage;
  aboutPhoto: SiteImage;
  aboutIllustration: SiteImage;
  contactImage: SiteImage;
  heroBackground: SiteImage;
  heroBackgroundMobile: SiteImage;
  contactBackground: SiteImage;
  contactBackgroundMobile: SiteImage;
  /** Hex, straight from Studio; null falls back to the shipped colour. */
  footerColour: string | null;
  /** Hex for the send button; null keeps the peach it ships with. */
  buttonColour: string | null;
  /** Hex for the circle behind each social mark; null keeps the brown. */
  socialIconColour: string | null;
};

const EMPTY_SITE_IMAGES: SiteImages = {
  avatar: null,
  aboutPhoto: null,
  aboutIllustration: null,
  contactImage: null,
  heroBackground: null,
  heroBackgroundMobile: null,
  contactBackground: null,
  contactBackgroundMobile: null,
  footerColour: null,
  buttonColour: null,
  socialIconColour: null,
};

const IMAGE_FIELDS = [
  "avatar",
  "aboutPhoto",
  "aboutIllustration",
  "contactImage",
  "heroBackground",
  "heroBackgroundMobile",
  "contactBackground",
  "contactBackgroundMobile",
];

export async function getSiteImages(): Promise<SiteImages> {
  const projection = IMAGE_FIELDS.map(
    (field) =>
      `"${field}": ${field}.asset->{ url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }`
  ).join(",\n    ");

  try {
    const result = await sanityClient.fetch<SiteImages | null>(
      `*[_id == "siteImages"][0]{\n    ${projection},\n    footerColour,\n    buttonColour,\n    socialIconColour\n  }`,
      {},
      { next: { revalidate: 60 } }
    );
    return { ...EMPTY_SITE_IMAGES, ...(result ?? {}) };
  } catch {
    // The page still has its shipped images, so a Sanity hiccup is not fatal.
    return EMPTY_SITE_IMAGES;
  }
}

/** The colours these two ship with, used until Studio says otherwise. */
export const FOOTER_COLOUR = "#F4F2E3";
export const BUTTON_COLOUR = "#FF917F";
export const SOCIAL_CIRCLE_COLOUR = "#3C1A05";

/** Accepts what Studio holds — with or without the leading # — and refuses
 *  anything that is not a hex colour, so a typo cannot inject CSS. */
function hexColour(value: string | null | undefined, fallback: string): string {
  if (!value) return fallback;
  const hex = value.trim().replace(/^#/, "");
  return /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex) ? `#${hex}` : fallback;
}

export function footerColour(value?: string | null): string {
  return hexColour(value, FOOTER_COLOUR);
}

export function buttonColour(value?: string | null): string {
  return hexColour(value, BUTTON_COLOUR);
}

export function socialCircleColour(value?: string | null): string {
  return hexColour(value, SOCIAL_CIRCLE_COLOUR);
}

/** Which ink stays readable on a given background.
 *
 *  The button's label is white, which works on the peach it ships with and on
 *  anything else of that depth. The site's palette is mostly pastel, though,
 *  and white on #FFD8CF cannot be read at all — so the label follows the
 *  colour rather than assuming it. The threshold is the WCAG relative
 *  luminance of the two candidate inks: below it white wins, above it the
 *  brown every other piece of text on the page already uses. */
export function readableInk(background: string): string {
  const hex = background.replace(/^#/, "");
  const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  const channel = (i: number) => {
    const v = parseInt(full.slice(i * 2, i * 2 + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
  return luminance > 0.45 ? "#3C1A05" : "#FFFFFF";
}

/** A CSS backdrop is not run through next/image, so without this it downloads
 *  whatever was uploaded — the current ones are 9300px PNGs of 11–14 MB, which
 *  is why they used to crawl in after the rest of the page. The CDN resizes and
 *  re-encodes on the fly, so the browser gets a viewport-sized WebP instead. */
export function backdropUrl(image?: SiteImage, width = 1920): string | null {
  if (!image?.url) return null;
  return `${image.url}?w=${width}&q=70&auto=format&fit=max`;
}

/** Copy for the two blocks that have a Ukrainian version. Empty fields fall
 *  back to the text written into the components. */
export type SiteText = {
  heroEn: string | null;
  heroUk: string | null;
  aboutEn: string | null;
  aboutUk: string | null;
};

const EMPTY_SITE_TEXT: SiteText = {
  heroEn: null,
  heroUk: null,
  aboutEn: null,
  aboutUk: null,
};

export async function getSiteText(): Promise<SiteText> {
  try {
    const result = await sanityClient.fetch<SiteText | null>(
      `*[_id == "siteText"][0]{ heroEn, heroUk, aboutEn, aboutUk }`,
      {},
      { next: { revalidate: 60 } }
    );
    return { ...EMPTY_SITE_TEXT, ...(result ?? {}) };
  } catch {
    return EMPTY_SITE_TEXT;
  }
}

export async function getIllustrations(): Promise<Illustration[]> {
  return sanityClient.fetch(
    `*[_type == "illustration"] | order(order asc, _createdAt desc) {
      _id,
      title,
      "imageUrl": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
    }`,
    {},
    // Without this Next caches the result forever, so edits in Studio never show up.
    { next: { revalidate: 60 } }
  );
}

/** The faces Studio may pick from. A fixed list rather than a free text field
 *  for two reasons: the name is dropped straight into a font-family and into a
 *  Google Fonts URL, so an allowlist is what keeps either from being injected
 *  into; and the site is bilingual, so anything offered here has to carry
 *  Cyrillic — Outfit, the English body face, does not, which is the whole
 *  reason the Ukrainian copy has a stand-in today. */
export const FONT_CHOICES: Record<string, { css: string; google: string }> = {
  "Nunito Sans": { css: "'Nunito Sans', sans-serif", google: "Nunito+Sans:wght@300;400;500" },
  Manrope: { css: "'Manrope', sans-serif", google: "Manrope:wght@300;400;500" },
  Montserrat: { css: "'Montserrat', sans-serif", google: "Montserrat:wght@300;400;500" },
  Rubik: { css: "'Rubik', sans-serif", google: "Rubik:wght@300;400;500" },
  Onest: { css: "'Onest', sans-serif", google: "Onest:wght@300;400;500" },
  "Golos Text": { css: "'Golos Text', sans-serif", google: "Golos+Text:wght@400;500" },
  Comfortaa: { css: "'Comfortaa', sans-serif", google: "Comfortaa:wght@300;400;500" },
  Inter: { css: "'Inter', sans-serif", google: "Inter:wght@300;400;500" },
};

export type SiteFonts = {
  /** The paragraph face. Empty keeps Outfit in English and Nunito Sans in Ukrainian. */
  bodyFont: string | null;
  /** Nav, form labels and the send button. Empty keeps Futura PT. */
  labelFont: string | null;
};

const EMPTY_SITE_FONTS: SiteFonts = { bodyFont: null, labelFont: null };

export async function getSiteFonts(): Promise<SiteFonts> {
  try {
    const result = await sanityClient.fetch<SiteFonts | null>(
      `*[_id == "siteFonts"][0]{ bodyFont, labelFont }`,
      {},
      { next: { revalidate: 60 } }
    );
    return { ...EMPTY_SITE_FONTS, ...(result ?? {}) };
  } catch {
    return EMPTY_SITE_FONTS;
  }
}

/** Resolves what Studio holds to a face this site ships support for. Anything
 *  unrecognised — an old name, a typo, a hand-edited document — comes back as
 *  null, which is the same as "not set": the page keeps the pairing it was
 *  built with rather than falling back to whatever the device has. */
export function resolveFont(name?: string | null) {
  if (!name) return null;
  return FONT_CHOICES[name.trim()] ?? null;
}

/** The six handwritten phrases. Each is a drawing rather than text, so each
 *  language needs its own file; leaving one empty keeps the one that ships in
 *  /public/svg. Held as files rather than images on purpose: an SVG uploaded
 *  as an image goes through the transform CDN, which rasterises it. */
export type SiteHeadings = {
  heroEn: string | null;
  heroUk: string | null;
  aboutEn: string | null;
  aboutUk: string | null;
  contactEn: string | null;
  contactUk: string | null;
};

const EMPTY_SITE_HEADINGS: SiteHeadings = {
  heroEn: null,
  heroUk: null,
  aboutEn: null,
  aboutUk: null,
  contactEn: null,
  contactUk: null,
};

export async function getSiteHeadings(): Promise<SiteHeadings> {
  const fields = Object.keys(EMPTY_SITE_HEADINGS)
    .map((f) => `"${f}": ${f}.asset->url`)
    .join(",\n    ");
  try {
    const result = await sanityClient.fetch<SiteHeadings | null>(
      `*[_id == "siteHeadings"][0]{\n    ${fields}\n  }`,
      {},
      { next: { revalidate: 60 } }
    );
    return { ...EMPTY_SITE_HEADINGS, ...(result ?? {}) };
  } catch {
    return EMPTY_SITE_HEADINGS;
  }
}
