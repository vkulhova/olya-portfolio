"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import type { Illustration } from "@/lib/sanity";

/** Column count per breakpoint, matching the sm / lg steps used elsewhere. */
const BREAKPOINTS = [
  { query: "(min-width: 1024px)", columns: 3 },
  { query: "(min-width: 640px)", columns: 2 },
];
const DEFAULT_COLUMNS = 3;

/**
 * Deals the illustrations across the columns in the order Studio gives them:
 * the first three go across the top row, the next three across the row under
 * it, and so on. Position n always lands in column n % columnCount, so the
 * numbering reads left to right the way it is written.
 *
 * CSS columns cannot do this — they fill top to bottom, so 1, 2 and 3 would all
 * end up stacked in the first column.
 *
 * This used to hand each picture to whichever column was shortest, which kept
 * the columns level but broke the sequence: after the first row a tall picture
 * could push number five above number four, and the order Studio set no longer
 * matched what the eye read. Keeping the order costs a ragged bottom edge —
 * with pictures of different heights the columns cannot both stay level and
 * stay in sequence, and the sequence is the one that was asked for.
 */
function distribute(items: Illustration[], columnCount: number): Placed[][] {
  const columns: Placed[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((work, at) => columns[at % columnCount].push({ work, at }));
  return columns;
}

/** A picture and where it sits in Studio's order — which is the order the
 *  overlay steps through, not the order of the column it happens to be in. */
type Placed = { work: Illustration; at: number };

export default function MasonryGrid({ items }: { items: Illustration[] }) {
  // The server has no viewport, so it lays out the desktop case and the client
  // corrects it on mount if the screen is narrower.
  const [columnCount, setColumnCount] = useState(DEFAULT_COLUMNS);

  useEffect(() => {
    const lists = BREAKPOINTS.map((b) => window.matchMedia(b.query));
    const update = () => {
      const hit = BREAKPOINTS.findIndex((_, i) => lists[i].matches);
      setColumnCount(hit === -1 ? 1 : BREAKPOINTS[hit].columns);
    };
    update();
    lists.forEach((l) => l.addEventListener("change", update));
    return () => lists.forEach((l) => l.removeEventListener("change", update));
  }, []);

  const columns = distribute(items, columnCount);

  /* Which picture the overlay is showing, as a position in `items`. Card #73.
     Stepping wraps around both ends, so the arrows never dead-end. */
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback(
    (delta: number) =>
      setOpen((at) => (at === null ? null : (at + delta + items.length) % items.length)),
    [items.length]
  );

  return (
    <>
      {/* 76% on a phone: card #62's green frame puts the picture 48px in from
          each edge of a 402px screen, which is 305 of it.

          92.5% from sm, and 28 between the columns — card #93. Its red frame
          sits about 3.75% in from each side of the window, where the grid had
          7; the frame was drawn by hand 49 and 58px in, so the two sides are
          evened out. The gap between the columns is half the 56 it was, as
          the card asks. */}
      <div className="w-[76%] sm:w-[92.5%] mx-auto flex gap-x-14 sm:gap-x-7 items-start">
        {columns.map((column, i) => (
          // 48px between pictures on a phone, so the white between them
          // matches the white at the sides — the two things the blue marks on
          // card #62 pair up. From sm, 16: half the 32 it was, per card #93.
          <div key={i} className="flex-1 min-w-0 flex flex-col gap-12 sm:gap-4">
            {column.map(({ work, at }) => (
              /* A button rather than the picture on its own: opening the large
                 view is an action, so it answers to the keyboard and to a
                 screen reader as one. */
              <button
                key={work._id}
                type="button"
                onClick={() => setOpen(at)}
                aria-label={work.title ? `Open ${work.title}` : "Open illustration"}
                className="block w-full cursor-zoom-in"
              >
                <Image
                  src={work.imageUrl}
                  alt={work.title}
                  width={work.width}
                  height={work.height}
                  className="w-full h-auto"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onStep={step} />
    </>
  );
}
