/* Golden pattern line — one repeat unit tiles horizontally so element count
   scales with viewport. The tile holds three hearts, so its width is what
   decides how many land on a phone screen: at 145.6px that is a little under
   eight across a 375px screen. Phones only — desktop keeps the full size. */
export default function DecorativeDots() {
  return (
    <div
      className="w-full h-[17px] sm:h-[23px] bg-repeat-x bg-[length:145.6px_17px] sm:bg-[length:197px_23px]"
      style={{ backgroundImage: "url('/svg/pattern-tile.svg')" }}
      aria-hidden="true"
    />
  );
}
