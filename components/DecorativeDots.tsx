/* Golden pattern line — one repeat unit tiles horizontally so element count
   scales with viewport. The tile holds three hearts, so its width is what
   decides how many land on a screen: at 145.6px that is a little under eight
   across a 375px phone, and at 180px it is two more hearts across a wide
   window than the 197px tile used to give. The heights follow the tile so the
   drawing is never squashed. */
export default function DecorativeDots() {
  return (
    <div
      className="w-full h-[17px] sm:h-[21px] bg-repeat-x bg-[length:145.6px_17px] sm:bg-[length:180px_21px]"
      style={{ backgroundImage: "url('/svg/pattern-tile.svg')" }}
      aria-hidden="true"
    />
  );
}
