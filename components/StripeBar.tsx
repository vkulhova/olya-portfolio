/* Repeating peach stripe bar used between sections. On phones it matches the
   frill ribbon's 14px, and the squares shrink with it so they stay square. */
export default function StripeBar() {
  return (
    <div
      className="w-full h-[14px] sm:h-11 bg-[repeating-linear-gradient(90deg,#FFD8CF_0px,#FFD8CF_18px,#FF917F_18px,#FF917F_36px)] sm:bg-[repeating-linear-gradient(90deg,#FFD8CF_0px,#FFD8CF_55px,#FF917F_55px,#FF917F_110px)]"
    />
  );
}
