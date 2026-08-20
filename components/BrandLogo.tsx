import { paintBrand } from "./brandArt";

/** Everything the logo needs, resolved once in page.tsx and handed down: the
 *  wordmark appears in four places at four sizes, and they must all agree. */
export type Brand = {
  ink: string;
  blob: string;
  /** Uploaded replacements. When one is here it is shown as it was drawn, and
   *  the two colours above no longer apply to it — a file Olya supplies is
   *  hers, not ours to repaint. */
  full: string | null;
  mark: string | null;
};

export default function BrandLogo({
  which,
  className = "",
  brand,
}: {
  which: "full" | "mark";
  className?: string;
  brand: Brand;
}) {
  const uploaded = which === "full" ? brand.full : brand.mark;

  if (uploaded) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={uploaded} alt="Lolikar" className={className} />;
  }

  /* Ours, from components/brandArt.ts — nothing here comes from outside. The
     span carries the height class and .brand-logo makes the drawing fill it,
     which is what the w-auto on an <img> used to do. */
  return (
    <span
      aria-hidden="true"
      className={`brand-logo block ${className}`}
      dangerouslySetInnerHTML={{ __html: paintBrand(which, brand.ink, brand.blob) }}
    />
  );
}
