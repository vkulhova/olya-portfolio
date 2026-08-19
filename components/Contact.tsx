"use client";

import { useState } from "react";
import LocalisedHeading from "./LocalisedHeading";
import Image from "next/image";
import { useLanguage } from "./Language";
import { backdropUrl } from "@/lib/sanity";
import type { SiteHeadings, SiteImage } from "@/lib/sanity";

/** The form is the only block whose text lives in the code rather than in
 *  Studio — it is labels, not copy, so it is translated here. */
const COPY = {
  EN: {
    name: "Your name",
    surname: "Your surname",
    email: "Email",
    message: "Write your letter here...",
    send: "Post it!",
    sending: "Sending...",
    sent: "Sent ✓",
    error: "Something went wrong. Please try again.",
  },
  UA: {
    name: "Ваше імʼя",
    surname: "Ваше прізвище",
    email: "Email",
    message: "Напишіть тут свій лист",
    send: "Відправити",
    sending: "Надсилаємо...",
    sent: "Надіслано ✓",
    error: "Щось пішло не так. Спробуйте ще раз.",
  },
} as const;

export default function Contact({
  illustration,
  background,
  backgroundMobile,
  headings,
}: {
  illustration: SiteImage;
  background?: SiteImage;
  backgroundMobile?: SiteImage;
  headings?: SiteHeadings;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const backdrop = backdropUrl(background);
  /* Same as the hero band: phones can have their own upload, and without one
     they keep whatever the wide backdrop shows. */
  const mobileBackdrop = backdropUrl(backgroundMobile, 900);
  const copy = COPY[useLanguage()];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="w-full scroll-mt-[78px]">
    {/* An uploaded backdrop replaces the paper texture rather than sitting under
        it — the grain would only fight a real picture. The beige stays as the
        base colour so the block is never bare while the image loads. */}
    <div
      className="w-full relative"
      style={{
        backgroundColor: "#F0E8DA",
        backgroundImage: backdrop
          ? `url(${backdrop})`
          : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        ...(backdrop
          ? { backgroundSize: "cover", backgroundPosition: "center" }
          : null),
      }}
    >

      {/* A phone-only backdrop, layered over the block's own background because
          an inline style cannot carry a media query. Absent from the markup
          unless Studio has one, so nothing changes for the wide layout. */}
      {mobileBackdrop && (
        <div
          aria-hidden="true"
          className="absolute inset-0 sm:hidden bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${mobileBackdrop})` }}
        />
      )}

      {/* Double the blue above the card from sm up: the backdrop is meant to
          carry a drawing there, and 56px was not enough of it to see. Phones
          keep 56 — the band is the whole screen there. */}
      {/* relative so the form stays above the phone backdrop behind it. */}
      <div className="relative z-10 flex flex-col items-center py-14 sm:pt-28 px-6">
        {/* Scalloped card */}
        {/* Phones get the full width and tighter padding — at 70% the card was
            239px of a 390px screen, which squeezed the fields and left the
            illustration no room to grow. */}
        {/* Same radius as the hero card, so the two white blocks match */}
        <div className="flex flex-col w-full sm:w-[62%] bg-white rounded-3xl px-7 sm:px-12 pt-5 pb-6 sm:py-12">
          {/* Heading with the salmon star beside it, the same pairing About
              uses. nowrap keeps them on one line: the heading shrinks first. */}
          <div className="mb-5 sm:mb-8 flex items-center gap-3 flex-nowrap">
            <LocalisedHeading
              en={headings?.contactEn ?? "/svg/drop-a-letter.svg"}
              uk={headings?.contactUk ?? "/svg/drop-a-letter-uk.svg"}
              altEn="Drop a letter in my mailbox"
              altUk="Залиште лист у моїй скриньці"
              className="w-full max-w-[366px] min-w-0 shrink h-auto"
              ukClassName="w-full max-w-[389px] min-w-0 shrink h-auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/svg/star-salmon.svg"
              alt=""
              aria-hidden="true"
              className="w-[36px] h-[36px] sm:w-[53px] sm:h-[53px] shrink-0"
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* The mock sets the two name fields further apart than the 16px
                they had; phones keep the tighter gap, there is no room there. */}
            <div className="grid grid-cols-2 gap-4 sm:gap-10">
              <div className="flex flex-col gap-2">
                <label className="form-label text-[13px] sm:text-base text-dark">
                  {copy.name}
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="border border-gold rounded-lg px-4 py-2.5 font-futura text-sm tracking-wider outline-none focus:border-gold/80 bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="form-label text-[13px] sm:text-base text-dark">
                  {copy.surname}
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="border border-gold rounded-lg px-4 py-2.5 font-futura text-sm tracking-wider outline-none focus:border-gold/80 bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-[13px] sm:text-base text-dark">
                {copy.email}
              </label>
              <input
                type="email"
                name="email"
                required
                className="border border-gold rounded-lg px-4 py-2.5 font-futura text-sm tracking-wider outline-none focus:border-gold/80 bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-[13px] sm:text-base text-dark">
                {copy.message}
              </label>
              <textarea
                name="message"
                required
                className="border border-gold rounded-lg px-4 py-3 h-[84px] font-futura text-sm tracking-wider outline-none focus:border-gold/80 bg-white resize-none"
              />
            </div>

          </form>

          {/* On phones the letter opens the card, above the heading; from sm up
              it closes it, as before. It sits outside the form so the order can
              be swapped — the 52px top margin is what the form's gap-6 and the
              old mt-7 added up to there. */}
          <div className="flex justify-center order-first mb-4 sm:order-none sm:mt-[52px] sm:mb-2">
            <Image
              src={illustration?.url ?? "/images/work-1.png"}
              alt="Illustration"
              width={illustration?.width ?? 800}
              height={illustration?.height ?? 600}
              className="w-[75%] sm:w-[52.7%] h-auto object-contain"
            />
          </div>
        </div>

        {/* Submit button outside card. Its width follows the label with 24px of
            air either side, rather than the flat 192px it used to have — at
            that width the pill read as a long bar around a short word, and the
            longer Ukrainian label no longer has to fit the English one's box.
            The pl adds the trailing letter-space tracking leaves after the last
            glyph on top of that padding, which otherwise pulls the centred
            label visibly left. */}
        <button
          type="submit"
          form="contact-form"
          onClick={() => {
            const form = document.querySelector<HTMLFormElement>("#contact form");
            form?.requestSubmit();
          }}
          disabled={status === "sending" || status === "sent"}
          className="mt-14 px-6 h-14 pl-[calc(1.5rem+0.2em)] rounded-full bg-peach-mid text-white font-futura font-medium text-base tracking-[0.2em] uppercase hover:bg-peach-mid/90 transition-colors disabled:opacity-60"
        >
          {status === "sent" ? copy.sent : status === "sending" ? copy.sending : copy.send}
        </button>

        {status === "error" && (
          <p className="mt-3 text-red-500 font-futura text-xs tracking-wider">
            {copy.error}
          </p>
        )}
      </div>
    </div>
    </section>
  );
}
