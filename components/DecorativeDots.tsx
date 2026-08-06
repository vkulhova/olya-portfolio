/* Golden pattern line — one repeat unit tiles horizontally so element count
   scales with viewport. Phones get it at 60%: the tile keeps its proportions,
   so the hearts and dots simply come out smaller and more of them fit. */
export default function DecorativeDots() {
  return (
    <div
      className="w-full h-[14px] sm:h-[23px] bg-repeat-x bg-[length:118px_14px] sm:bg-[length:197px_23px]"
      style={{ backgroundImage: "url('/svg/pattern-tile.svg')" }}
      aria-hidden="true"
    />
  );
}
