"use client";

import Image from "next/image";
import { useLanguage } from "./Language";

/** One line of copy and three pictures that lead to the posts they come from.
 *  Desktop only: the phone design has the desk drawing in this spot instead. */
const COPY = {
  EN: "Follow @by.lolikar to see my work, sketches, and how things actually happen",
  UA: "Роботи й процес за кадром в моєму інстаграмі @by.lolikar",
} as const;

export type InstagramPost = { image: string; href: string };

/** Shipped until Studio holds its own. Each picture is the post it opens. */
export const DEFAULT_POSTS: InstagramPost[] = [
  { image: "/images/instagram-1.jpg", href: "https://www.instagram.com/p/DbqpUhEM0Us/" },
  { image: "/images/instagram-2.jpg", href: "https://www.instagram.com/p/Dbfq5JDsXww/" },
  { image: "/images/instagram-3.jpg", href: "https://www.instagram.com/p/DX8r19DjBRJ/?img_index=1" },
];

export default function Instagram({ posts = DEFAULT_POSTS }: { posts?: InstagramPost[] }) {
  const language = useLanguage();
  if (!posts.length) return null;

  /* The design has three, and three is the maximum Studio accepts — but the
     row is built from however many are actually there, so a set of two is a
     row of two rather than two and a hole.

     A variable rather than the property itself: phones stack the pictures in
     one column (card #70), and an inline style cannot carry a media query —
     so the class below decides where this template applies. */
  const columns = {
    "--ig-columns": `repeat(${posts.length}, minmax(0, 1fr))`,
  } as React.CSSProperties;

  return (
    /* On phones too, since card #70 — the drawing there stacks the pictures
       rather than dropping the row. */
    <section className="w-full bg-white pt-[46px] sm:pt-20 pb-24">
      <p className="instagram-line text-center text-dark px-6 mb-[37px] sm:mb-14">
        {COPY[language]}
      </p>

      {/* Three across from sm, stacked on a phone. The pictures are all 4:5,
          so the row keeps its rhythm whatever is uploaded in their place.
          69.6% and 59px apart on a phone, which is what the drawing on card
          #70 measures out of its 588. */}
      <div
        className="w-[69.6%] sm:w-[78%] mx-auto grid grid-cols-1 gap-[59px] sm:gap-8 lg:gap-14 sm:[grid-template-columns:var(--ig-columns)]"
        style={columns}
      >
        {posts.map((post, i) => (
          <a
            key={post.href || i}
            href={post.href}
            target="_blank"
            /* noreferrer as well as noopener: the post should not learn which
               page sent the visitor. */
            rel="noopener noreferrer"
            /* group so the two hover marks below can answer to the link
               rather than to themselves. */
            className="group relative block overflow-hidden"
          >
            <Image
              src={post.image}
              alt=""
              width={960}
              height={1200}
              sizes="(max-width: 640px) 70vw, (max-width: 1280px) 30vw, 350px"
              className="w-full h-auto object-cover"
            />

            {/* Hover: the picture pales under a half-opaque white, and a heart
                appears in the corner. Both are decoration — aria-hidden, and
                pointer-events-none so neither can swallow the click. Motion is
                dropped for anyone who has asked their system for less of it;
                the marks still appear, just without the fade. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-50 motion-reduce:transition-none"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/svg/heart-white.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 left-8 w-9 h-9 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
