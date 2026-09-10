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
    /* On a phone the white under the last row matches the white beside the
       rows, as cards #64 and #69 ask: the grid is 76% wide, leaving 12% at
       each side, and 12% is the figure below.

       From sm the bottom stays the 7% those cards set, but the sides no longer
       match it: card #93 widens the grid to 92.5% and says in so many words to
       leave the white above the footer alone.

       107 on top from sm rather than 92 — card #93's frame starts a little
       lower than the pictures did, about 15px on its screenshot. */
    <section id="portfolio" className="w-full bg-white pt-[82px] sm:pt-[107px] pb-[12%] sm:pb-[7%] scroll-mt-[78px]">
      <MasonryGrid items={works} />
    </section>
  );
}
