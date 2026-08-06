/* Repeating peach stripe bar used between sections. On phones only the height
   comes down, to the frill ribbon's 14px — the stripes keep their full width,
   so they read as long rectangles rather than squares. */
export default function StripeBar() {
  return (
    <div
      className="w-full h-[14px] sm:h-11 bg-[repeating-linear-gradient(90deg,#FFD8CF_0px,#FFD8CF_55px,#FF917F_55px,#FF917F_110px)]"
    />
  );
}
