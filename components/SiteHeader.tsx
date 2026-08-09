import StripeBar from "./StripeBar";
import DecorativeDots from "./DecorativeDots";
import Nav from "./Nav";
import { LanguageSwitcher } from "./Language";

/** The part of the page that stays put whichever section is selected: the
 *  stripe, the big logo and the nav bar.
 *
 *  A Fragment, not a wrapper element: the nav has to be a direct child of
 *  <main> for `sticky` to hold all the way down. Nested in a div of its own it
 *  would unstick as soon as that div scrolled past.
 */
export default function SiteHeader() {
  return (
    <>
      <div id="home">
        <StripeBar />

        {/* Logo. pb here + the nav's own py keep the original 43px gap.
            Phones skip this block entirely — there the bar itself carries the
            logo and the burger from the very top of the page. */}
        <div className="relative bg-white pt-[53px] pb-[23px] hidden sm:flex flex-col items-center">
          {/* Same target as its small twin in the pinned bar */}
          <a href="#portfolio" aria-label="Lolikar — portfolio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/svg/lolikar.svg" alt="Lolikar" className="h-24 w-auto" />
          </a>

          {/* Top-right of the header, above the nav row. Its twin in the pinned
              bar takes over once this one scrolls away. */}
          <LanguageSwitcher className="absolute right-8 top-6 hidden sm:flex" />
        </div>
      </div>

      <Nav />

      {/* One ribbon for every section rather than one inside each: the sections
          spaced it slightly differently, so switching between them made it hop.
          pt here + the nav's py keep the original 40px gap; pb-8 the white gap
          before whatever the section opens with. */}
      <div className="bg-white pt-[20px] pb-8">
        <DecorativeDots />
      </div>
    </>
  );
}
