"use client";

import { useState } from "react";
import DecorativeDots from "./DecorativeDots";
import Image from "next/image";
import { backdropUrl } from "@/lib/sanity";
import type { SiteImage } from "@/lib/sanity";

export default function Contact({
  illustration,
  background,
}: {
  illustration: SiteImage;
  background?: SiteImage;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const backdrop = backdropUrl(background);

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
      {/* Dots bar on white, inside the section so Contact begins at the pattern
          — same as About — rather than at the beige band below it */}
      <div className="w-full bg-white pt-6 pb-9">
        <DecorativeDots />
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

      <div className="flex flex-col items-center py-14 px-6">
        {/* Scalloped card */}
        {/* Phones get the full width and tighter padding — at 70% the card was
            239px of a 390px screen, which squeezed the fields and left the
            illustration no room to grow. */}
        <div className="w-full sm:w-[70%] bg-white px-5 sm:px-10 py-12">
          {/* "Drop a letter in my mailbox" SVG heading from Figma */}
          <div className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/svg/drop-a-letter.svg"
              alt="Drop a letter in my mailbox"
              className="w-full max-w-[510px] h-auto"
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-futura text-base font-medium tracking-[0.05em] text-dark">
                  Your name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="border border-gold rounded-lg px-4 py-2.5 font-futura text-sm tracking-wider outline-none focus:border-gold/80 bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-futura text-base font-medium tracking-[0.05em] text-dark">
                  Your surname
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
              <label className="font-futura text-base font-medium tracking-[0.05em] text-dark">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="border border-gold rounded-lg px-4 py-2.5 font-futura text-sm tracking-wider outline-none focus:border-gold/80 bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-futura text-base font-medium tracking-[0.05em] text-dark">
                Write your letter here...
              </label>
              <textarea
                name="message"
                required
                className="border border-gold rounded-lg px-4 py-3 h-[84px] font-futura text-sm tracking-wider outline-none focus:border-gold/80 bg-white resize-none"
              />
            </div>

            {/* Illustration inside card */}
            {/* mt-7 sits with the form's gap-6 just under the 56px the card's
                bottom padding leaves below the illustration */}
            <div className="flex justify-center mt-7 mb-2">
              <Image
                src={illustration?.url ?? "/images/work-1.png"}
                alt="Illustration"
                width={illustration?.width ?? 800}
                height={illustration?.height ?? 600}
                className="w-full sm:w-[52.7%] h-auto object-contain"
              />
            </div>
          </form>
        </div>

        {/* Submit button outside card. The pl offsets the trailing letter-space
            tracking leaves after the last glyph, which otherwise pulls the
            centred label visibly left. */}
        <button
          type="submit"
          form="contact-form"
          onClick={() => {
            const form = document.querySelector<HTMLFormElement>("#contact form");
            form?.requestSubmit();
          }}
          disabled={status === "sending" || status === "sent"}
          className="mt-14 w-48 h-14 pl-[0.2em] rounded-full bg-pink text-white font-futura font-medium text-sm tracking-[0.2em] uppercase hover:bg-pink/90 transition-colors disabled:opacity-60"
        >
          {status === "sent" ? "Sent ✓" : status === "sending" ? "Sending..." : "Post it!"}
        </button>

        {status === "error" && (
          <p className="mt-3 text-red-500 font-futura text-xs tracking-wider">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
    </section>
  );
}
