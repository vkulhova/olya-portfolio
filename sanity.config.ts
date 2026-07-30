import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { TrashIcon } from "@sanity/icons";
import BulkDeleteTool from "./sanity/BulkDeleteTool";

export default defineConfig({
  name: "lolikar-portfolio",
  title: "Lolikar Portfolio",
  projectId: "v18r1vne",
  dataset: "production",
  // Must match the route the Studio is mounted on (app/studio/[[...tool]]).
  // Without it the Studio reads the URL from the root, takes "studio" for a
  // tool name and fails with "Tool not found: studio".
  basePath: "/studio",
  plugins: [structureTool()],
  // Studio has no built-in multi-select delete, so this adds a second tab
  // alongside Content for clearing several illustrations at once.
  tools: (prev) => [
    ...prev,
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
        fields: [
          { name: "title", type: "string", title: "Title" },
          { name: "image", type: "image", title: "Image", options: { hotspot: true } },
          { name: "order", type: "number", title: "Order" },
        ],
      },
    ],
  },
});
