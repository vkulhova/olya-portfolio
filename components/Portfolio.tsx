import Image from "next/image";
import { getIllustrations, type Illustration } from "@/lib/sanity";

export default async function Portfolio() {
  let works: Illustration[] = [];
  try {
    works = await getIllustrations();
  } catch {
    // fallback: show nothing rather than crash
  }

  return (
    /* pb-6 rather than pb-10: About takes the other 16px as breathing room
       above its dot trim, so the seam is unchanged in total */
    <section id="portfolio" className="w-full bg-white pt-20 pb-6 scroll-mt-[60px]">
      {/* Masonry via CSS columns: items flow to their natural height, so the gap
          between one image and the next is always the same regardless of ratio. */}
      <div className="w-[86%] mx-auto columns-1 sm:columns-2 lg:columns-3 gap-x-14">
        {works.map((work) => (
          <div key={work._id} className="mb-8 break-inside-avoid">
            <Image
              src={work.imageUrl}
              alt={work.title}
              width={work.width}
              height={work.height}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 500px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
