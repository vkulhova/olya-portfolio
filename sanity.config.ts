import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { SortIcon, TrashIcon, UploadIcon } from "@sanity/icons";
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
