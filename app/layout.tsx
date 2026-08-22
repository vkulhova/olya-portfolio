import type { Metadata } from "next";
import "./globals.css";
import { getSiteFonts, resolveFont } from "@/lib/sanity";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The two faces Studio may override. Anything it does not recognise resolves
  // to null, and null means the page keeps the pairing it ships with: the
  // variables are simply not written, so the fallbacks in globals.css stand.
  const fonts = await getSiteFonts();
  const body = resolveFont(fonts.bodyFont);
  const label = resolveFont(fonts.labelFont);
  const form = resolveFont(fonts.formFont);

  // One stylesheet for whichever of the three were chosen. Both files are already
  // imported for the shipped faces, so nothing extra is fetched until she
  // actually picks something.
  const families = [body?.google, label?.google, form?.google].filter(
    (f, i, all): f is string => Boolean(f) && all.indexOf(f) === i
  );
  const googleHref = families.length
    ? `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join("&")}&display=swap`
    : null;

  const style = {
    ...(body ? { "--font-body": body.css } : null),
    ...(label ? { "--font-label": label.css } : null),
    ...(form ? { "--font-form": form.css } : null),
  } as React.CSSProperties;

  return (
    <html lang="en" style={style}>
      {googleHref && (
        <head>
          <link rel="stylesheet" href={googleHref} />
        </head>
      )}
      <body>{children}</body>
    </html>
  );
}
