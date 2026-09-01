import { createClient } from "@sanity/client";
import { FONT_CHOICES } from "./fonts";

/* Re-exported so callers keep importing fonts from one place; the list itself
   lives in lib/fonts.ts, which Studio also reads to build its dropdowns. */
export { FONT_CHOICES } from "./fonts";

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
  /** The two stripes in the bar at the top of the page. */
  stripeColourLight: string | null;
  stripeColourDark: string | null;
  /** The gold hearts in the ribbon under the nav. */
  ribbonColour: string | null;
  /** The wordmark: its lettering and the mint shape behind it. */
  logoInk: string | null;
  logoBlob: string | null;
  /** Uploaded SVGs that replace the drawings outright. */
  logoFull: SiteImage;
  logoMark: SiteImage;
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
  stripeColourLight: null,
  stripeColourDark: null,
  ribbonColour: null,
  logoInk: null,
  logoBlob: null,
  logoFull: null,
  logoMark: null,
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
      `*[_id == "siteImages"][0]{\n    ${projection},\n    footerColour,\n    buttonColour,\n    socialIconColour,
    stripeColourLight,\n    stripeColourDark,\n    ribbonColour,\n    logoInk,\n    logoBlob,
    "logoFull": logoFull.asset->{ url, "width": 0, "height": 0 },
    "logoMark": logoMark.asset->{ url, "width": 0, "height": 0 }\n  }`,
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
export const STRIPE_LIGHT = "#FFD8CF";
export const STRIPE_DARK = "#FF917F";
export const RIBBON_COLOUR = "#D5BA54";
export const LOGO_INK = "#00507D";
export const LOGO_BLOB = "#B9E8E4";

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

export function stripeLight(value?: string | null): string {
  return hexColour(value, STRIPE_LIGHT);
}

export function stripeDark(value?: string | null): string {
  return hexColour(value, STRIPE_DARK);
}

export function ribbonColour(value?: string | null): string {
  return hexColour(value, RIBBON_COLOUR);
}

export function logoInk(value?: string | null): string {
  return hexColour(value, LOGO_INK);
}

export function logoBlob(value?: string | null): string {
  return hexColour(value, LOGO_BLOB);
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
  contactEn: string | null;
  contactUk: string | null;
};

const EMPTY_SITE_TEXT: SiteText = {
  heroEn: null,
  heroUk: null,
  aboutEn: null,
  aboutUk: null,
  contactEn: null,
  contactUk: null,
};

export async function getSiteText(): Promise<SiteText> {
  try {
    const result = await sanityClient.fetch<SiteText | null>(
      `*[_id == "siteText"][0]{ heroEn, heroUk, aboutEn, aboutUk, contactEn, contactUk }`,
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

export type SiteFonts = {
  /** The paragraph face. Empty keeps Outfit in English and Nunito Sans in Ukrainian. */
  bodyFont: string | null;
  /** Nav and the send button. Empty keeps Futura PT. */
  labelFont: string | null;
  /** The contact form only — its labels and the text visitors type into it.
   *  Empty follows labelFont, which is how the form behaved before this
   *  existed. */
  formFont: string | null;
  /** Paragraph size in px. Empty keeps the 16 the site is drawn at. Faces set
   *  at the same size do not read at the same size — x-heights differ — so the
   *  size follows the face rather than being fixed to it. */
  bodySize: number | null;
};

const EMPTY_SITE_FONTS: SiteFonts = {
  bodyFont: null,
  labelFont: null,
  formFont: null,
  bodySize: null,
};

export async function getSiteFonts(): Promise<SiteFonts> {
  try {
    const result = await sanityClient.fetch<SiteFonts | null>(
      `*[_id == "siteFonts"][0]{ bodyFont, labelFont, formFont, bodySize }`,
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
/** The size Studio holds, as a CSS length — or null to keep the shipped 16px.
 *  Clamped rather than trusted: Studio validates the field, but a hand-edited
 *  document should not be able to set the whole site to 2px or 400. */
export const BODY_SIZE_MIN = 12;
export const BODY_SIZE_MAX = 24;

export function resolveBodySize(value?: number | null): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const px = Math.min(BODY_SIZE_MAX, Math.max(BODY_SIZE_MIN, Math.round(value)));
  return `${px}px`;
}

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
  /** «Colaboration», the phrase above the contact copy. */
  collabEn: string | null;
  collabUk: string | null;
};

const EMPTY_SITE_HEADINGS: SiteHeadings = {
  heroEn: null,
  heroUk: null,
  aboutEn: null,
  aboutUk: null,
  contactEn: null,
  contactUk: null,
  collabEn: null,
  collabUk: null,
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
