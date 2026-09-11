"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

/**
 * A picture drifting up into place as it scrolls into view — card #101, which
 * asks for barely any movement, one picture at a time, each at its own pace.
 *
 * So each one rises only 14 to 22px and fades in over 0.9 to 1.5s, starting up
 * to 0.16s late. The spread comes from the picture's place in Studio's order
 * rather than from chance, so a row never moves in step and the page moves the
 * same way on every visit.
 *
 * Only pictures still below the screen when the page arrives wait to rise:
 * whatever is already in sight stays put rather than jumping down and back.
 * Nothing moves for a visitor who has asked their system for less motion, and
 * without the script every picture is simply where it belongs.
 */
function Rise({ at, children }: { at: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"still" | "waiting" | "risen">("still");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    setPhase("waiting");
    // Starts once the picture is a little way onto the screen, not the moment
    // its top edge touches the bottom of it, so the movement can be seen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPhase("risen");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const duration = 900 + ((at * 7919) % 13) * 50;
  const delay = ((at * 104729) % 9) * 20;
  const distance = 14 + ((at * 31) % 9);

  const style: React.CSSProperties =
    phase === "waiting"
      ? { transform: `translateY(${distance}px)`, opacity: 0 }
      : phase === "risen"
        ? {
            transform: "none",
            opacity: 1,
            transition: `transform ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms, opacity ${Math.round(duration * 0.8)}ms ease-out ${delay}ms`,
          }
        : {};

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
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
              <Rise key={work._id} at={at}>
                <button
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
              </Rise>
            ))}
          </div>
        ))}
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onStep={step} />
    </>
  );
}
