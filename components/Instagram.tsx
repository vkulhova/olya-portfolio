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

  return (
    /* Hidden below sm rather than absent from the markup: the phone layout is
       a separate design, not a narrower version of this one. */
    <section className="hidden sm:block w-full bg-white pt-20 pb-24">
      <p className="body-copy font-outfit font-medium text-center text-dark px-6 mb-14">
        {COPY[language]}
      </p>

      {/* Three across, always. The pictures are all 4:5, so the row keeps its
          rhythm whatever is uploaded in their place. */}
      <div className="w-[78%] mx-auto grid grid-cols-3 gap-8 lg:gap-14">
        {posts.map((post, i) => (
          <a
            key={post.href || i}
            href={post.href}
            target="_blank"
            /* noreferrer as well as noopener: the post should not learn which
               page sent the visitor. */
            rel="noopener noreferrer"
            className="block overflow-hidden"
          >
            <Image
              src={post.image}
              alt=""
              width={960}
              height={1200}
              sizes="(max-width: 1280px) 30vw, 350px"
              className="w-full h-auto object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
