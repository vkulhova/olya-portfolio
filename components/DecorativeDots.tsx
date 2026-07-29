/* Golden pattern line — one repeat unit tiles horizontally so element count scales with viewport */
export default function DecorativeDots() {
  return (
    <div
      className="w-full"
      style={{
        height: "23px",
        backgroundImage: "url('/svg/pattern-tile.svg')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "197px 23px",
      }}
      aria-hidden="true"
    />
  );
}
