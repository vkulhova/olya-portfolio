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

/** Roughly the vertical gap as a fraction of a column's width, so a column
 *  carrying more items is not treated as shorter than it looks. */
const GAP_IN_COLUMN_WIDTHS = 0.08;

/**
 * Distributes illustrations across columns in numbered order, each one going to
 * whichever column is currently shortest.
 *
 * CSS columns cannot do this: they fill top to bottom, so positions 1, 2, 3 all
 * land in the first column. Here the first three go across the top row, which is
 * how the numbering reads.
 *
 * Only aspect ratios matter, not pixels — every column is the same width, so the
 * layout is settled before anything is measured.
 */
function distribute(items: Illustration[], columnCount: number): Illustration[][] {
  const columns: Illustration[][] = Array.from({ length: columnCount }, () => []);
  const heights = new Array(columnCount).fill(0);

  items.forEach((item) => {
    let shortest = 0;
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(item);
    const ratio = item.width && item.height ? item.height / item.width : 1;
    heights[shortest] += ratio + GAP_IN_COLUMN_WIDTHS;
  });

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
