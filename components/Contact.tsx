"use client";

import { useState } from "react";
import LocalisedHeading from "./LocalisedHeading";
import LocalisedText from "./LocalisedText";
import Image from "next/image";
import { useLanguage } from "./Language";
import { backdropUrl, buttonColour, readableInk } from "@/lib/sanity";
import type { SiteHeadings, SiteImage, SiteText } from "@/lib/sanity";

/** Used until the Studio field is filled in. Blank lines split the paragraphs,
 *  the same way About and the hero card read theirs. */
const DEFAULT_CONTACT_EN = `Looking for an illustrator for your project, your book, your brand or an idea all of your own? I am always open to interesting collaborations and to new creative challenges.

Let us tell your story through visual art. Write to me about what you have in mind through the form below, or send an email, and we will go through all the details together.`;

const DEFAULT_CONTACT_UK = `Шукаєте ілюстратора для свого проєкту, книги, бренду чи унікальної ідеї? Я завжди відкрита до цікавих колаборацій та нових творчих викликів.

Розповімо вашу історію через візуальне мистецтво! Розкажіть мені про свої задуми через форму нижче або напишіть на пошту, і ми обговоримо всі деталі.`;

/** The form is the only block whose text lives in the code rather than in
 *  Studio — it is labels, not copy, so it is translated here. */
const COPY = {
  EN: {
    name: "Name",
    surname: "Surname",
    email: "Email",
    message: "Write your letter here...",
    send: "Post it!",
    sending: "Sending...",
    sent: "Sent ✓",
    error: "Something went wrong. Please try again.",
  },
  UA: {
    name: "Імʼя",
    surname: "Прізвище",
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
  text,
  buttonColourHex,
}: {
  illustration: SiteImage;
  background?: SiteImage;
  backgroundMobile?: SiteImage;
  headings?: SiteHeadings;
  text?: SiteText;
  buttonColourHex?: string | null;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const backdrop = backdropUrl(background);
  /* Same as the hero band: phones can have their own upload, and without one
     they keep whatever the wide backdrop shows. */
  const mobileBackdrop = backdropUrl(backgroundMobile, 900);
  const copy = COPY[useLanguage()];
  /* Resolved once here rather than in the markup: the label's colour is read
     off the background, so the two have to be decided together. */
  const buttonBg = buttonColour(buttonColourHex);
  const buttonInk = readableInk(buttonBg);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
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

    {/* The white opening: the phrase, the copy, then the letter. It used to be
        the form straight after the ribbon, with the letter buried at the foot
        of the card — the drawing now introduces the section instead of closing
        it. The top spacing is About's, so both sections start on the same
        line under the ribbon. */}
    <div className="w-full bg-white">
      <div className="w-[78%] mx-auto pt-8 sm:pt-[72px] pb-10 sm:pb-14 flex flex-col items-center">
        {/* Phrase and star, paired the way About pairs its heading with the
            olive one. nowrap keeps them on one line: the phrase shrinks first. */}
        {/* gap-5 rather than the 3 About uses: this star sits beside the end
            of a word rather than a whole phrase, and at 3 its rays touched the
            final letter. */}
        <div className="flex items-center gap-4 sm:gap-5 flex-nowrap">
          <LocalisedHeading
            en={headings?.collabEn ?? "/svg/colaboration.svg"}
            uk={headings?.collabUk ?? headings?.collabEn ?? "/svg/colaboration.svg"}
            altEn="Colaboration"
            altUk="Колаборація"
            className="h-[38px] sm:h-[48px] w-auto min-w-0 shrink"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/star-salmon.svg"
            alt=""
            aria-hidden="true"
            className="w-[42px] h-[42px] sm:w-[53px] sm:h-[53px] shrink-0 self-start"
          />
        </div>

        {/* Centred and held to a readable measure rather than run across the
            full 78% — at this size the line would otherwise be far longer than
            the copy in About, which is kept beside a photo. */}
        <div className="mt-7 sm:mt-9 max-w-[640px] flex flex-col gap-4 text-center">
          <LocalisedText
            en={text?.contactEn?.trim() || DEFAULT_CONTACT_EN}
            uk={text?.contactUk?.trim() || DEFAULT_CONTACT_UK}
            className="body-copy font-outfit text-dark text-justify"
          />
        </div>

        {/* The letter, moved up here from inside the form card. Same Studio
            field as before — nothing has to be uploaded again. */}
        <div className="mt-10 sm:mt-12 w-[70%] sm:w-[380px] max-w-full">
          <Image
            src={illustration?.url ?? "/images/work-1.png"}
            alt="Illustration"
            width={illustration?.width ?? 985}
            height={illustration?.height ?? 845}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>

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
      <div className="relative z-10 flex flex-col items-center py-20 sm:pt-28 sm:pb-28 px-6">
        {/* Scalloped card */}
        {/* Phones get the full width and tighter padding — at 70% the card was
            239px of a 390px screen, which squeezed the fields and left the
            illustration no room to grow. */}
        {/* Same radius as the hero card, so the two white blocks match */}
        <div className="flex flex-col w-full sm:w-[51%] bg-white rounded-[6px] px-7 sm:px-12 pt-8 pb-10 sm:pt-12 sm:pb-16">
          {/* Heading with the salmon star beside it, the same pairing About
              uses. nowrap keeps them on one line: the heading shrinks first. */}
          {/* Centred on phones, where the phrase is the only thing on its line
              and sitting hard left left it looking dropped rather than placed.
              From sm up it stays left, which is where the desktop reference
              puts it. The gap and nowrap went with the star. */}
          <div className="mb-5 sm:mb-8 flex items-center justify-start sm:justify-center">
            {/* The salmon star that used to sit here has moved up beside
                «Colaboration». Two of the same star on one screen read as a
                repeat rather than a pair, and the reference puts it at the
                top. */}
            <LocalisedHeading
              en={headings?.contactEn ?? "/svg/drop-a-letter.svg"}
              uk={headings?.contactUk ?? "/svg/drop-a-letter-uk.svg"}
              altEn="Drop a letter in my mailbox"
              altUk="Залиште лист у моїй скриньці"
              className="max-h-[50px] sm:max-h-[52px] w-auto max-w-full h-auto min-w-0 shrink"
              ukClassName="max-h-[52px] sm:max-h-[48px] w-auto max-w-full h-auto min-w-0 shrink"
            />
          </div>

          <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* The mock sets the two name fields further apart than the 16px
                they had; phones keep the tighter gap, there is no room there. */}
            {/* One grid rather than two stacked cells side by side. Both
                captions share the first row and both boxes the second, so a
                caption that wraps makes the whole row taller instead of
                pushing its own box below its neighbour's — which is what put
                the surname field out of line on phones. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-2">
              <label className="form-label text-dark">
                {copy.name}
              </label>
              <label className="form-label text-dark">
                {copy.surname}
              </label>
              <input
                type="text"
                name="firstName"
                required
                className="border-2 border-[#BCB9A2] rounded-[2px] px-4 py-2.5 form-field outline-none focus:border-gold bg-white"
              />
              <input
                type="text"
                name="lastName"
                required
                className="border-2 border-[#BCB9A2] rounded-[2px] px-4 py-2.5 form-field outline-none focus:border-gold bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-dark">
                {copy.email}
              </label>
              <input
                type="email"
                name="email"
                required
                className="border-2 border-[#BCB9A2] rounded-[2px] px-4 py-2.5 form-field outline-none focus:border-gold bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="form-label text-dark">
                {copy.message}
              </label>
              <textarea
                name="message"
                required
                className="border-2 border-[#BCB9A2] rounded-[2px] px-4 py-3 h-[84px] form-field outline-none focus:border-gold bg-white resize-none"
              />
            </div>

            {/* Bait for form-filling bots — off-screen rather than
                display:none, which some of them check for. Nothing here is
                reachable by keyboard or read aloud; the server drops any
                submission that fills it. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute w-px h-px -left-[9999px] opacity-0"
            />
          </form>

          {/* The button sits inside the card, centred under the fields. It used
              to stand on the backdrop below it, which read as a separate
              object rather than as the end of the form.

              Its width follows the label with 24px of air either side, rather
              than the flat 192px it once had — at that width the pill read as
              a long bar around a short word, and the longer Ukrainian label no
              longer has to fit the English one's box. The pl adds the trailing
              letter-space tracking leaves after the last glyph on top of that
              padding, which otherwise pulls the centred label visibly left. */}
          <div className="mt-10 sm:mt-16 flex flex-col items-center">
            <button
              type="submit"
              form="contact-form"
              disabled={status === "sending" || status === "sent"}
              className="btn-send px-6 h-14 pl-[calc(1.5rem+0.2em)] rounded-[62px] font-chrome font-bold text-[18px] tracking-[4px] uppercase transition-colors disabled:opacity-60"
              style={{ "--btn-bg": buttonBg, "--btn-ink": buttonInk } as React.CSSProperties}
            >
              {status === "sent" ? copy.sent : status === "sending" ? copy.sending : copy.send}
            </button>

            {status === "error" && (
              <p className="mt-3 text-red-500 form-field text-xs tracking-wider text-center">
                {copy.error}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
    </section>
  );
}
