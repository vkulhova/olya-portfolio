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
};

const EMPTY_SITE_IMAGES: SiteImages = {
  avatar: null,
  aboutPhoto: null,
  aboutIllustration: null,
  contactImage: null,
};

const IMAGE_FIELDS = ["avatar", "aboutPhoto", "aboutIllustration", "contactImage"];

export async function getSiteImages(): Promise<SiteImages> {
  const projection = IMAGE_FIELDS.map(
    (field) =>
      `"${field}": ${field}.asset->{ url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }`
  ).join(",\n    ");

  try {
    const result = await sanityClient.fetch<SiteImages | null>(
      `*[_id == "siteImages"][0]{\n    ${projection}\n  }`,
      {},
      { next: { revalidate: 60 } }
    );
    return { ...EMPTY_SITE_IMAGES, ...(result ?? {}) };
  } catch {
    // The page still has its shipped images, so a Sanity hiccup is not fatal.
    return EMPTY_SITE_IMAGES;
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
