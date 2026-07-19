/* Golden pattern line — one repeat unit tiles horizontally so element count scales with viewport */
export default function DecorativeDots() {
  return (
    <div
      className="w-full"
      style={{
        height: "29px",
        backgroundImage: "url('/svg/pattern-tile.svg')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "246px 29px",
      }}
      aria-hidden="true"
    />
  );
}
