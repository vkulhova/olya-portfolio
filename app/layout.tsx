import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lolikar — Portfolio",
  description: "Illustration portfolio of Olika Nikolska — warm, cozy, detailed illustrations",
  // Written out rather than left to the app/icon.* convention, which offered
  // only one raster icon and labelled favicon.ico as 16x16 when it holds three
  // sizes. Safari keeps a favicon by its URL, so anyone who visited while the
  // icon was still broken kept the empty tile; the filenames below are new,
  // which is what makes it fetch again.
  icons: {
    icon: [
      { url: "/favicon-v2.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-180.png", sizes: "180x180", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
