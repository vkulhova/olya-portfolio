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
    <section id="portfolio" className="w-full bg-white pt-20 pb-10">
      <div className="w-[86%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-8">
        {works.map((work) => (
          <div key={work._id} className="w-full">
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
