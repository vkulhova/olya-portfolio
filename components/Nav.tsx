"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const LINKS = ["portfolio", "about", "contact"] as const;
type Section = (typeof LINKS)[number];

/** Height of the pinned bar — the line that decides which section we are "on". */
const BAR_HEIGHT = 60;

/** How close to the target counts as "arrived", in px. */
const ARRIVED_WITHIN = 2;

/** Last-resort release, in case the target can never sit exactly under the bar
 *  (e.g. the page runs out of scroll). Long enough to outlast a glide across
 *  the whole page, which a short timeout would cut off midway. */
const LOCK_TIMEOUT = 4000;

function currentSection(): Section {
  // The last section whose top has passed under the bar is the one we're in.
  // At the very top nothing has passed yet, so the first link stays lit.
  let current: Section = LINKS[0];
  for (const id of LINKS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= BAR_HEIGHT + 1) current = id;
  }
  return current;
}

export default function Nav() {
  const [active, setActive] = useState<Section>(LINKS[0]);

  // While a nav link is being followed, the clicked section stays lit instead of
  // flickering through every section the page glides past on the way there.
  const lockedRef = useRef<Section | null>(null);
  const timerRef = useRef<number | null>(null);

  const release = useCallback(() => {
    lockedRef.current = null;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleClick = useCallback(
    (id: Section) => {
      setActive(id);
      lockedRef.current = id;
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(release, LOCK_TIMEOUT);
    },
    [release]
  );

  useEffect(() => {
    const onScroll = () => {
      const locked = lockedRef.current;
      if (locked) {
        const el = document.getElementById(locked);
        const arrived =
          el && Math.abs(el.getBoundingClientRect().top - BAR_HEIGHT) <= ARRIVED_WITHIN;
        if (!arrived) return;
        release();
      }
      setActive(currentSection());
    };

    // Any hands-on scrolling means the user has taken over: drop the lock at
    // once so the highlight follows them again, even mid-glide.
    const onUserInput = () => {
      if (lockedRef.current) {
        release();
        setActive(currentSection());
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onUserInput, { passive: true });
    window.addEventListener("touchstart", onUserInput, { passive: true });
    window.addEventListener("keydown", onUserInput);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchstart", onUserInput);
      window.removeEventListener("keydown", onUserInput);
      release();
    };
  }, [release]);

  return (
    <nav className="sticky top-0 z-40 bg-white flex justify-center gap-10 py-5">
      {LINKS.map((link) => (
        <a
          key={link}
          href={`#${link}`}
          onClick={() => handleClick(link)}
          aria-current={active === link ? "page" : undefined}
          className={`font-futura font-medium text-sm tracking-[0.25em] uppercase transition-colors hover:text-gold ${
            active === link ? "text-gold" : "text-dark"
          }`}
        >
          {link}
        </a>
      ))}
    </nav>
  );
}
