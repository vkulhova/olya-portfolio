import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "lolikar-portfolio",
  title: "Lolikar Portfolio",
  projectId: "v18r1vne",
  dataset: "production",
  plugins: [structureTool()],
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
