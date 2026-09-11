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
       lower than the pictures did, about 15px on its screenshot.

       Then 10% of the window, never less than those 107 — card #106, which
       asks for about as much white over the pictures as the eye finds over
       the footer. That white is the 7% below plus the margin the lowest
       drawing carries inside its own frame, and it measures 10% of the width
       at every size: 128 at 1280, 151 at 1506, 174 at 1728. A share rather
       than a figure so the two stay alike as the window changes; the floor
       keeps narrower screens from losing any of the white they have now. */
    <section id="portfolio" className="w-full bg-white pt-[82px] sm:pt-[max(107px,10%)] pb-[12%] sm:pb-[7%] scroll-mt-[78px]">
      <MasonryGrid items={works} />
    </section>
  );
}
