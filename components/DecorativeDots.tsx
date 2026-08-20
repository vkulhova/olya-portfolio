/* Golden pattern line — one repeat unit tiles horizontally so element count
   scales with viewport. The tile holds three hearts, so its width is what
   decides how many land on a screen: at 145.6px that is a little under eight
   across a 375px phone, and at 180px it is two more hearts across a wide
   window than the 197px tile used to give. The heights follow the tile so the
   drawing is never squashed.

   The tile is now a mask rather than a picture, so Studio can set its colour:
   see .ribbon-line. The drawing is unchanged. */
export default function DecorativeDots({ colour }: { colour?: string }) {
  return (
    <div
      className="ribbon-line w-full h-[17px] sm:h-[21px]"
      style={(colour ? { "--ribbon": colour } : {}) as React.CSSProperties}
      aria-hidden="true"
    />
  );
}
