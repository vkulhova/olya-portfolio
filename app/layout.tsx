import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lolikar — Portfolio",
  description: "Illustration portfolio of Olika Nikolska — warm, cozy, detailed illustrations",
  // Written out rather than left to the app/icon.* convention, which offered
  // only one raster icon and labelled favicon.ico as 16x16 when it holds three
  // sizes. Safari keeps a favicon by its URL, so anyone who visited while the
  // icon was still broken kept the empty tile; the filenames carry a version,
  // which is what makes it fetch again.
  //
  // /apple-touch-icon.png and its -precomposed twin sit in public/ rather than
  // being listed here: Safari asks for those two paths by name when it builds
  // a start-page or bookmark tile, and does not always read the link tag. They
  // used to 404, which is what left the tile empty.
  icons: {
    icon: [
      { url: "/favicon-v3.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-180-v3.png", sizes: "180x180", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
