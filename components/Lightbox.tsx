"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { Illustration } from "@/lib/sanity";

/* The three marks are Olya's own drawings, lifted path for path out of the SVG
   on card #73 rather than redrawn: the close mark is not a plain X but two
   chevrons facing each other, and the arrows carry the same pinch. Each one is
   normalised to its own box so it can be set at whatever size the two designs
   ask for; the stroke is given in viewBox units so that it comes out at the 3px
   the desktop drawing measures and the 2 the phone one does, rather than being
   scaled along with the shape.

   currentColor throughout, so the colour is set once on the button. */
function CloseMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M0 32L15.81 16L0 0M32 32L16.19 16L32 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron({ back = false, className = "" }: { back?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 19 32" fill="none" aria-hidden="true" className={className}>
      <path
        d={back ? "M18.565 0L0 15.913L18.565 31.826" : "M0 31.826L18.57 15.913L0 0"}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One illustration at full size over a white page — card #73.
 *
 * The desktop has arrows on either side and wraps around at both ends, so a
 * visitor can keep going in one direction and see everything. The phone design
 * has no arrows: the drawing there fills the width, and the picture is closed
 * and another one opened from the grid instead.
 *
 * The keyboard does what the buttons do — Escape closes, the arrow keys step —
 * and Tab stays inside the overlay while it is open, so the page behind it
 * cannot be reached without closing it first.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: Illustration[];
  /** Which picture is open; null when the overlay is closed. */
  index: number | null;
  onClose: () => void;
  /** −1 and +1; the caller wraps around the ends. */
  onStep: (delta: number) => void;
}) {
  const open = index !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /* What had the focus before the overlay opened, so it can be handed back
     when it closes — otherwise the focus falls to the top of the page and the
     next Tab starts from the beginning. */
  const previous = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previous.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous.current?.focus?.();
  }, [open]);

  /* The page behind must not scroll under the overlay. The scrollbar's width is
     given back as padding so nothing on the page shifts sideways as it goes. */
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const overflow = body.style.overflow;
    const padding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = overflow;
      body.style.paddingRight = padding;
    };
  }, [open]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
      if (e.key !== "Tab") return;
      // Keeps Tab inside the overlay: three buttons at most, in DOM order.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose, onStep]
  );

  if (!open) return null;
  const work = items[index];
  if (!work) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={work.title || "Illustration"}
      onKeyDown={onKeyDown}
      /* Above the back-to-top button, which is itself z-50 and fixed: with
         the two on the same level it showed through the overlay. */
      className="fixed inset-0 z-[60] bg-white text-dark"
    >
      {/* The picture. 77.5% of the window's height on the desktop, which is the
          777 of 1003 the drawing measures, and never wider than the middle of
          the window so the arrows keep their room. On a phone it runs the full
          width, as its own drawing does, and is centred in what is left. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={work.imageUrl}
          alt={work.title}
          width={work.width}
          height={work.height}
          priority
          sizes="(max-width: 640px) 100vw, 64vw"
          className="w-full sm:w-auto h-auto max-h-full sm:max-h-[77.5vh] sm:max-w-[64vw] object-contain"
        />
      </div>

      {/* Close. 32px at 76 in from the right and 97 down on the desktop, 27px
          at 48 and 53 on a phone — both straight off the drawings. */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-[48px] top-[53px] sm:right-[76px] sm:top-[97px] transition-opacity hover:opacity-60"
      >
        <CloseMark className="w-[27px] h-[27px] sm:w-8 sm:h-8 [stroke-width:2.37] sm:[stroke-width:3]" />
      </button>

      {/* The arrows are the desktop's own: the phone design does not have them,
          and with one picture there is nowhere to step to.

          15.86% of the window from each edge — the 274px the drawing puts the
          left one at, out of its 1728. The drawing's right arrow is 27px
          further out than that, which reads as a hand-placed difference rather
          than an intent, so the pair is set symmetrically off the left one. */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous illustration"
            className="hidden sm:block absolute left-[15.86%] top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
          >
            <Chevron back className="w-[19px] h-8" />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next illustration"
            className="hidden sm:block absolute right-[15.86%] top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
          >
            <Chevron className="w-[19px] h-8" />
          </button>
        </>
      )}
    </div>
  );
}
