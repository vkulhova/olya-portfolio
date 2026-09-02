import { getIllustrations, type Illustration } from "@/lib/sanity";
import MasonryGrid from "./MasonryGrid";

export default async function Portfolio() {
  let works: Illustration[] = [];
  try {
    works = await getIllustrations();
  } catch {
    // fallback: show nothing rather than crash
  }

  return (
    /* pb-4 rather than pb-10: About takes the other 24px as breathing room
       above its dot trim, so the seam is unchanged in total */
    <section id="portfolio" className="w-full bg-white pt-20 sm:pt-24 pb-4 scroll-mt-[78px]">
      <MasonryGrid items={works} />
    </section>
  );
}
