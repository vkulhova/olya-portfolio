import { fontOptions } from "./lib/fonts";
import { defineConfig, defineField } from "sanity";
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
              .title("Site fonts")
              .id("siteFonts")
              .icon(EditIcon)
              .child(
                S.document()
                  .schemaType("siteFonts")
                  .documentId("siteFonts")
                  .title("Site fonts")
              ),
            S.listItem()
              .title("Site headings")
              .id("siteHeadings")
              .icon(EditIcon)
              .child(
                S.document()
                  .schemaType("siteHeadings")
                  .documentId("siteHeadings")
                  .title("Site headings")
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
          {
            name: "contactEn",
            type: "text",
            rows: 6,
            title: "Collaboration — English",
            description: "Separate paragraphs with a blank line between them.",
          },
          {
            name: "contactUk",
            type: "text",
            rows: 6,
            title: "Collaboration — Ukrainian",
            description: "Shown when UA is selected. Empty falls back to English.",
          },
        ],
        preview: {
          prepare: () => ({ title: "Site text" }),
        },
      },
      {
        name: "siteFonts",
        type: "document",
        title: "Site fonts",
        // A list rather than a free text box: the name goes straight into a
        // font-family and a Google Fonts URL, and every face offered here has
        // to carry Cyrillic, since the same one is used for both languages.
        // Leaving a field empty keeps the pairing the site ships with.
        fields: [
          {
            name: "bodyFont",
            type: "string",
            title: "Body text",
            description:
              "The paragraphs in the hero card and in About. Empty keeps Outfit in English and Nunito Sans in Ukrainian.",
            options: { list: fontOptions("As it ships (Outfit / Nunito Sans)") },
          },
          {
            name: "labelFont",
            type: "string",
            title: "Nav",
            description:
              "The spaced capitals in the menu. Empty keeps Futura PT. The contact form, including its button, has its own setting below.",
            options: { list: fontOptions("As it ships (Futura PT)") },
          },
          {
            name: "bodyFontUk",
            type: "string",
            title: "Body text — Ukrainian",
            description:
              "Used only on the Ukrainian side. Empty means the Ukrainian text uses the same face as the English above.",
            options: { list: fontOptions("Same as English") },
          },
          {
            name: "labelFontUk",
            type: "string",
            title: "Nav — Ukrainian",
            description:
              "Used only on the Ukrainian side. Empty means the same face as the English above.",
            options: { list: fontOptions("Same as English") },
          },
          {
            name: "formFontUk",
            type: "string",
            title: "Contact form — Ukrainian",
            description:
              "Used only on the Ukrainian side. Empty means the same face as the English above.",
            options: { list: fontOptions("Same as English") },
          },
          defineField({
            name: "bodySize",
            type: "number",
            title: "Body text size",
            description:
              "Paragraph size in pixels, 12 to 24. Empty keeps 16, which is what the site is drawn at. Worth touching after changing the body face: two faces set at the same size rarely look the same size, because their letters are not the same height.",
            validation: (Rule) => Rule.min(12).max(24).integer(),
          }),
          {
            name: "formFont",
            type: "string",
            title: "Contact form",
            description:
              "Everything in the contact form: the field captions, the text visitors type into the boxes, and the «Відправити» button. Empty follows the nav choice above.",
            options: { list: fontOptions("Same as the nav") },
          },
        ],
        preview: {
          prepare: () => ({ title: "Site fonts" }),
        },
      },
      {
        name: "siteHeadings",
        type: "document",
        title: "Site headings",
        // The handwritten phrases. A file field rather than an image one: an
        // SVG uploaded as an image is sent through the transform CDN, which
        // turns it into a bitmap and loses the crispness that is the whole
        // point of shipping them as vectors.
        fields: [
          {
            name: "heroEn",
            type: "file",
            title: "Hero card — English",
            description:
              "Today: “Hello and welcome”. Empty keeps it. SVG, cropped tight to the lettering.",
            options: { accept: "image/svg+xml" },
          },
          {
            name: "heroUk",
            type: "file",
            title: "Hero card — Ukrainian",
            description:
              "Today: “Вітаю! Рада, що ви тут :)”. Empty keeps it. SVG, cropped tight to the lettering.",
            options: { accept: "image/svg+xml" },
          },
          {
            name: "aboutEn",
            type: "file",
            title: "About — English",
            description:
              "Today: “A few words about me”. Empty keeps it. SVG, cropped tight to the lettering.",
            options: { accept: "image/svg+xml" },
          },
          {
            name: "aboutUk",
            type: "file",
            title: "About — Ukrainian",
            description:
              "Today: “Кілька слів про мене”. Empty keeps it. SVG, cropped tight to the lettering.",
            options: { accept: "image/svg+xml" },
          },
          {
            name: "contactEn",
            type: "file",
            title: "Contact — English",
            description:
              "Today: “Drop a letter in my mailbox”. Empty keeps it. SVG, cropped tight to the lettering.",
            options: { accept: "image/svg+xml" },
          },
          {
            name: "contactUk",
            type: "file",
            title: "Contact — Ukrainian",
            description:
              "Today: “Залиште лист у моїй скриньці”. Empty keeps it. SVG, cropped tight to the lettering.",
            options: { accept: "image/svg+xml" },
          },
          {
            name: "collabEn",
            type: "file",
            title: "«Colaboration» — English",
            description:
              "The handwritten phrase above the contact text. An SVG; empty keeps the one that ships.",
            options: { accept: "image/svg+xml" },
          },
          {
            name: "collabUk",
            type: "file",
            title: "«Colaboration» — Ukrainian",
            description:
              "The same phrase for the Ukrainian page. Empty keeps the English drawing, which is what ships.",
            options: { accept: "image/svg+xml" },
          },
        ],
        preview: {
          prepare: () => ({ title: "Site headings" }),
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
          {
            name: "heroBackground",
            type: "image",
            title: "Background behind the hero card",
            description:
              "The band that is mustard today. Covers the area, so a wide image suits it best. Empty keeps the flat colour.",
            options: { hotspot: true },
          },
          {
            name: "heroBackgroundMobile",
            type: "image",
            title: "Background behind the hero card — phones",
            description:
              "Used instead of the one above on screens under 640px, where a wide picture shows only its middle. Empty keeps the wide one on phones too.",
            options: { hotspot: true },
          },
          {
            name: "contactBackground",
            type: "image",
            title: "Background behind the contact form",
            description:
              "The block that is beige today. Covers the area. Empty keeps the flat colour and its paper texture.",
            options: { hotspot: true },
          },
          {
            name: "contactBackgroundMobile",
            type: "image",
            title: "Background behind the contact form — phones",
            description:
              "Used instead of the one above on screens under 640px. Empty keeps the wide one on phones too.",
            options: { hotspot: true },
          },
          // defineField rather than a plain object: it is the only way to get
          // the Rule argument typed without writing the type out by hand.
          defineField({
            name: "accentColour",
            type: "string",
            title: "Highlight colour",
            description:
              "Marks the section you are on in the menu and the language you are in. A hex code such as BD9E30. Empty keeps the gold.",
            validation: (Rule) =>
              Rule.regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                name: "hex colour",
              }),
          }),
          defineField({
            name: "hideStripeBar",
            type: "boolean",
            title: "Hide the striped bar",
            description:
              "Takes the striped bar off the top of every page. Off keeps it. The header closes up on its own — nothing else moves.",
          }),
          defineField({
            name: "stripeColourLight",
            type: "string",
            title: "Stripe bar — light stripe",
            description:
              "The pale half of the striped bar at the very top. A hex code such as FFD8CF. Empty keeps the shipped colour.",
            validation: (Rule) =>
              Rule.regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                name: "hex colour",
              }),
          }),
          defineField({
            name: "stripeColourDark",
            type: "string",
            title: "Stripe bar — dark stripe",
            description:
              "The deeper half of the same bar, such as FF917F. Empty keeps the shipped colour.",
            validation: (Rule) =>
              Rule.regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                name: "hex colour",
              }),
          }),
          defineField({
            name: "ribbonColour",
            type: "string",
            title: "Heart ribbon colour",
            description:
              "The line of hearts under the nav, such as D5BA54. Empty keeps the gold. The drawing itself does not change — only its colour.",
            validation: (Rule) =>
              Rule.regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                name: "hex colour",
              }),
          }),
          defineField({
            name: "logoInk",
            type: "string",
            title: "Logo — lettering colour",
            description:
              "The blue of «Lolikar» and of the L on phones, such as 00507D. Empty keeps it. Ignored for a logo uploaded below.",
            validation: (Rule) =>
              Rule.regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                name: "hex colour",
              }),
          }),
          defineField({
            name: "logoBlob",
            type: "string",
            title: "Logo — background shape colour",
            description:
              "The mint shape behind the lettering, such as B9E8E4. Empty keeps it. Ignored for a logo uploaded below.",
            validation: (Rule) =>
              Rule.regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                name: "hex colour",
              }),
          }),
          {
            name: "logoFull",
            type: "file",
            title: "Logo — your own drawing",
            description:
              "An SVG that replaces «Lolikar» everywhere it appears. Empty keeps the one that ships, in whatever colours are set above.",
            options: { accept: "image/svg+xml" },
          },
          {
            name: "logoMark",
            type: "file",
            title: "Logo — your own L",
            description:
              "An SVG that replaces the single L shown in the pinned bar on phones. Empty keeps the one that ships.",
            options: { accept: "image/svg+xml" },
          },
          defineField({
            name: "socialIconColour",
            type: "string",
            title: "Social icon colour",
            description:
              "The circle behind each social mark in the footer. A hex code such as 3C1A05 — the # is optional. Empty keeps the brown. The mark inside always takes the footer's own colour, so it stays a clean cut-out whatever the band is set to.",
            validation: (Rule) =>
              Rule.regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                name: "hex colour",
              }),
          }),
          defineField({
            name: "buttonColour",
            type: "string",
            title: "Send button colour",
            description:
              "The «Post it! / Відправити» button under the contact form. A hex code such as FF917F — the # is optional. Empty keeps the peach the site ships with. The label switches between white and brown on its own, whichever stays readable on the colour chosen.",
            validation: (Rule) =>
              Rule.regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                name: "hex colour",
              }),
          }),
          defineField({
            name: "footerColour",
            type: "string",
            title: "Footer background colour",
            description:
              "A hex code such as F4F2E3 — the # is optional. Empty keeps the colour the site ships with.",
            validation: (Rule) =>
              Rule.regex(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                name: "hex colour",
              }),
          }),
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
