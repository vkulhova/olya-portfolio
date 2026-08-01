import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { EditIcon, ImagesIcon, SortIcon, TrashIcon, UploadIcon } from "@sanity/icons";
import BulkDeleteTool from "./sanity/BulkDeleteTool";
import ImportTool from "./sanity/ImportTool";
import OrderInput from "./sanity/OrderInput";
import ReorderTool from "./sanity/ReorderTool";

export default defineConfig({
  name: "lolikar-portfolio",
  title: "Lolikar Portfolio",
  projectId: "v18r1vne",
  dataset: "production",
  // Must match the route the Studio is mounted on (app/studio/[[...tool]]).
  // Without it the Studio reads the URL from the root, takes "studio" for a
  // tool name and fails with "Tool not found: studio".
  basePath: "/studio",
  // The generated list sorts by last edited, which hides the gallery order the
  // whole schema is built around. This lists illustrations by position instead.
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Illustration")
              .schemaType("illustration")
              .child(
                S.documentTypeList("illustration")
                  .title("Illustration")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            // A single fixed document rather than a list — there is only ever
            // one of each of these images.
            S.listItem()
              .title("Site text")
              .id("siteText")
              .icon(EditIcon)
              .child(
                S.document()
                  .schemaType("siteText")
                  .documentId("siteText")
                  .title("Site text")
              ),
            S.listItem()
              .title("Site images")
              .id("siteImages")
              .icon(ImagesIcon)
              .child(
                S.document()
                  .schemaType("siteImages")
                  .documentId("siteImages")
                  .title("Site images")
              ),
          ]),
    }),
  ],
  // Studio has no built-in multi-select delete, so this adds a second tab
  // alongside Content for clearing several illustrations at once.
  tools: (prev) => [
    ...prev,
    {
      name: "order",
      title: "Order",
      icon: SortIcon,
      component: ReorderTool,
    },
    {
      name: "import",
      title: "Import",
      icon: UploadIcon,
      component: ImportTool,
    },
    {
      name: "bulk-delete",
      title: "Bulk delete",
      icon: TrashIcon,
      component: BulkDeleteTool,
    },
  ],
  schema: {
    types: [
      {
        name: "siteText",
        type: "document",
        title: "Site text",
        // Paragraphs are separated by a blank line. Leaving a field empty keeps
        // the text that ships with the site, so a half-finished translation
        // never shows up as a gap.
        fields: [
          {
            name: "heroEn",
            type: "text",
            rows: 6,
            title: "Hero card — English",
            description: "The short intro in the card at the top of the page.",
          },
          {
            name: "heroUk",
            type: "text",
            rows: 6,
            title: "Hero card — Ukrainian",
            description: "Shown when UA is selected. Empty falls back to English.",
          },
          {
            name: "aboutEn",
            type: "text",
            rows: 14,
            title: "About — English",
            description: "Separate paragraphs with a blank line between them.",
          },
          {
            name: "aboutUk",
            type: "text",
            rows: 14,
            title: "About — Ukrainian",
            description: "Shown when UA is selected. Empty falls back to English.",
          },
        ],
        preview: {
          prepare: () => ({ title: "Site text" }),
        },
      },
      {
        name: "siteImages",
        type: "document",
        title: "Site images",
        // The four one-off pictures. Leaving one empty keeps the file that
        // ships with the site, so the page never ends up with a hole in it.
        fields: [
          {
            name: "avatar",
            type: "image",
            title: "Hero avatar",
            description: "The round portrait in the card at the top of the page.",
            options: { hotspot: true },
          },
          {
            name: "aboutPhoto",
            type: "image",
            title: "About photo",
            description:
              "Your photo beside the About text. Shown in a 3:4 frame — anything wider is cropped from the sides.",
            options: { hotspot: true },
          },
          {
            name: "aboutIllustration",
            type: "image",
            title: "Illustration under About",
            description: "The wide drawing below the About text.",
            options: { hotspot: true },
          },
          {
            name: "contactImage",
            type: "image",
            title: "Contact form illustration",
            description: "The drawing inside the contact card, under the message field.",
            options: { hotspot: true },
          },
        ],
        preview: {
          prepare: () => ({ title: "Site images" }),
        },
      },
      {
        name: "illustration",
        type: "document",
        title: "Illustration",
        // A new illustration lands at the end of the gallery. The raw
        // perspective is what makes unpublished ones count: without it an
        // unpublished position would be handed out twice, and the two documents
        // would collide the moment both were published. An unpublished number
        // is simply missing from the site until it goes live.
        // math::max returns null on an empty dataset, so the first one gets 1.
        initialValue: async (_params: unknown, context: any) => {
          const client = context
            .getClient({ apiVersion: "2024-01-01" })
            .withConfig({ perspective: "raw" });
          const highest: number | null = await client.fetch(
            `math::max(*[_type == "illustration"].order)`
          );
          return { order: (highest ?? 0) + 1 };
        },
        orderings: [
          {
            name: "positionAsc",
            title: "Position",
            by: [{ field: "order", direction: "asc" }],
          },
        ],
        // Shows the position in the list, which is otherwise only visible by
        // opening each document.
        preview: {
          select: { title: "title", order: "order", media: "image" },
          prepare({ title, order, media }: Record<string, any>) {
            const name = title || "(untitled)";
            return {
              title: typeof order === "number" ? `${order}. ${name}` : name,
              subtitle: typeof order === "number" ? undefined : "No position set",
              media,
            };
          },
        },
        fields: [
          { name: "title", type: "string", title: "Title" },
          { name: "image", type: "image", title: "Image", options: { hotspot: true } },
          {
            name: "order",
            type: "number",
            title: "Order",
            description:
              "Position in the gallery. Applying a position pushes the rest down.",
            components: { input: OrderInput },
          },
        ],
      },
    ],
  },
});
