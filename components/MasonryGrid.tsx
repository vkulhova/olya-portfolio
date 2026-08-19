"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
function distribute(items: Illustration[], columnCount: number): Illustration[][] {
  const columns: Illustration[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => columns[i % columnCount].push(item));
  return columns;
}

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

  return (
    <div className="w-[86%] mx-auto flex gap-x-14 items-start">
      {columns.map((column, i) => (
        <div key={i} className="flex-1 min-w-0 flex flex-col gap-8">
          {column.map((work) => (
            <Image
              key={work._id}
              src={work.imageUrl}
              alt={work.title}
              width={work.width}
              height={work.height}
              className="w-full h-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
