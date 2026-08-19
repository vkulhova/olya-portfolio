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
      `*[_id == "siteImages"][0]{\n    ${projection},\n    footerColour\n  }`,
      {},
      { next: { revalidate: 60 } }
    );
    return { ...EMPTY_SITE_IMAGES, ...(result ?? {}) };
  } catch {
    // The page still has its shipped images, so a Sanity hiccup is not fatal.
    return EMPTY_SITE_IMAGES;
  }
}

/** The colour the footer ships with, used until Studio says otherwise. */
export const FOOTER_COLOUR = "#F4F2E3";

/** Accepts what Studio holds — with or without the leading # — and refuses
 *  anything that is not a hex colour, so a typo cannot inject CSS. */
export function footerColour(value?: string | null): string {
  if (!value) return FOOTER_COLOUR;
  const hex = value.trim().replace(/^#/, "");
  return /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex) ? `#${hex}` : FOOTER_COLOUR;
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
