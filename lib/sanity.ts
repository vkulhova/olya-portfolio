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
