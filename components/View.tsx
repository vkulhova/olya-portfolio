"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/** The site shows one section at a time rather than scrolling through all of
 *  them. Which one is in the URL hash, so links are shareable and Back works;
 *  the nav does not have to intercept anything — it stays plain <a href="#…">.
 */
export const VIEWS = ["home", "portfolio", "about", "contact"] as const;
export type ViewName = (typeof VIEWS)[number];

const DEFAULT_VIEW: ViewName = "home";

function fromHash(): ViewName {
  const name = window.location.hash.replace("#", "");
  return (VIEWS as readonly string[]).includes(name) ? (name as ViewName) : DEFAULT_VIEW;
}

const ViewContext = createContext<ViewName>(DEFAULT_VIEW);

export const useView = () => useContext(ViewContext);

export function ViewProvider({ children }: { children: ReactNode }) {
  // The server has no hash to read, so the first render is always the default
  // and the effect below corrects it before anything is interacted with.
  const [view, setView] = useState<ViewName>(DEFAULT_VIEW);

  useEffect(() => {
    const sync = () => {
      setView(fromHash());
      // A new section starts at its own beginning, not at the scroll position
      // left behind by the previous one.
      window.scrollTo(0, 0);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return <ViewContext.Provider value={view}>{children}</ViewContext.Provider>;
}

/** Renders whichever section is selected. All four arrive already rendered
 *  from the server, so switching costs nothing — no refetch, no reload. */
export function ViewSwitch(sections: Record<ViewName, ReactNode>) {
  const view = useView();
  return <>{sections[view]}</>;
}
