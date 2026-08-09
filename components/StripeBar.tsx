/* Repeating peach stripe bar used between sections. Phones get a shorter bar
   (14px, matching the frill ribbon) with narrower stripes — 35px puts a little
   over ten of them across a 375px screen — while staying wide enough to read
   as rectangles rather than squares. Desktop keeps the original 55px. */
export default function StripeBar() {
  return (
    <div
      className="w-full h-[14px] sm:h-[22px] bg-[repeating-linear-gradient(90deg,#FFD8CF_0px,#FFD8CF_35px,#FF917F_35px,#FF917F_70px)] sm:bg-[repeating-linear-gradient(90deg,#FFD8CF_0px,#FFD8CF_55px,#FF917F_55px,#FF917F_110px)]"
    />
  );
}
