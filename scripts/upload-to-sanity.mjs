/**
 * Upload illustrations to Sanity.
 * Usage: SANITY_TOKEN=<your-token> node scripts/upload-to-sanity.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const TOKEN = process.env.SANITY_TOKEN || process.env.ST;
if (!TOKEN) {
  console.error("❌  Set SANITY_TOKEN env var first.");
  process.exit(1);
}

const client = createClient({
  projectId: "v18r1vne",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// Images to upload — order matches layout in 6.pdf
const IMAGES = [
  "Untitled_Artwork 15 1.png",
  "Untitled_Artwork 17 2.png",
  "Untitled_Artwork 13 (1).png",
  "Untitled_Artwork 16 2.png",
  "Untitled_Artwork 18 2.png",
  "Untitled_Artwork 19 2.png",
  "Untitled_Artwork 20 2.png",
  "Untitled_Artwork 21 2.png",
  "3 2 2.png",
  "4 3 2.png",
  "6 3 2.png",
  "7 2 2.png",
  "9 2 2.png",
  "Layer_4 2.png",
  "Original_2 2.png",
];

const IMAGES_DIR = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
  "public",
  "images"
);

async function main() {
  // Upload each image and create a document
  for (let i = 0; i < IMAGES.length; i++) {
    const filename = IMAGES[i];
    const filepath = path.join(IMAGES_DIR, filename);

    if (!fs.existsSync(filepath)) {
      console.warn(`⚠️  Not found, skipping: ${filename}`);
      continue;
    }

    process.stdout.write(`⬆️  [${i + 1}/${IMAGES.length}] ${filename}… `);

    // Upload the image asset
    const asset = await client.assets.upload("image", fs.createReadStream(filepath), {
      filename,
    });

    // Create the illustration document
    const title = filename.replace(/\.[^.]+$/, "");
    await client.create({
      _type: "illustration",
      title,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
      order: i + 1,
    });

    console.log("✅");
  }

  console.log("\n🎉  All done! Refresh sanity.io/manage to verify.");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
