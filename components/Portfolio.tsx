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
    /* The white under the last row matches the white beside the rows, which is
       what cards #64 and #69 ask for. Both are percentages of the window, so
       they stay matched: the grid is 76% of a phone and 86% from sm, leaving
       12% and 7% at each side, and those are the two figures below.

       It used to be 16px, chosen back when a dot trim followed this section
       and took the rest of the gap. That trim has moved under the band above,
       so the section now closes on its own. */
    <section id="portfolio" className="w-full bg-white pt-[82px] sm:pt-[92px] pb-[12%] sm:pb-[7%] scroll-mt-[78px]">
      <MasonryGrid items={works} />
    </section>
  );
}
