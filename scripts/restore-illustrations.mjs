/**
 * Recreate the `illustration` documents in Sanity.
 *
 * The image assets are already uploaded — only the documents that referenced
 * them were lost, which left the portfolio grid empty. This script rebuilds
 * those documents from the existing assets, so nothing is re-uploaded.
 *
 * Deterministic _ids + createOrReplace make it safe to re-run.
 *
 * Usage: SANITY_TOKEN=<editor-token> node scripts/restore-illustrations.mjs
 */

import { createClient } from "@sanity/client";

const TOKEN = process.env.SANITY_TOKEN || process.env.ST;
if (!TOKEN) {
  console.error("❌  Set SANITY_TOKEN env var first (needs Editor write access).");
  process.exit(1);
}

const client = createClient({
  projectId: "v18r1vne",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// Gallery order, matching the layout in 6.pdf.
// "Untitled_Artwork 13 (1).png" (the winged envelope) is deliberately left out.
const GALLERY = [
  "Untitled_Artwork 15 1.png",
  "Untitled_Artwork 17 2.png",
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

const docId = (filename) =>
  "illustration-" +
  filename
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function main() {
  const assets = await client.fetch(
    `*[_type == "sanity.imageAsset"]{_id, originalFilename}`
  );
  const byFilename = new Map(assets.map((a) => [a.originalFilename, a._id]));

  const missing = GALLERY.filter((f) => !byFilename.has(f));
  if (missing.length) {
    console.error("❌  These assets are not in Sanity:\n   " + missing.join("\n   "));
    process.exit(1);
  }

  const tx = client.transaction();
  GALLERY.forEach((filename, i) => {
    tx.createOrReplace({
      _id: docId(filename),
      _type: "illustration",
      title: filename.replace(/\.[^.]+$/, ""),
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: byFilename.get(filename) },
      },
      order: i + 1,
    });
  });

  await tx.commit();
  console.log(`✅  Wrote ${GALLERY.length} illustration documents.`);

  // Report anything left over rather than deleting it — removal stays a manual call.
  const wanted = new Set(GALLERY.map(docId));
  const existing = await client.fetch(`*[_type == "illustration"]{_id, title}`);
  const extra = existing.filter((d) => !wanted.has(d._id));
  if (extra.length) {
    console.log("\n⚠️  Extra illustration documents still in the dataset:");
    extra.forEach((d) => console.log(`   ${d._id}  (${d.title})`));
    console.log("   Delete them in Sanity Studio if they shouldn't be in the gallery.");
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
