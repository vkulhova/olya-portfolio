/* Thin repeating peach stripe bar used between sections. Phones get it at 60%
   — the same reduction as the frill ribbon — so height and stripe width shrink
   together and the squares stay square. */
export default function StripeBar() {
  return (
    <div
      className="w-full h-[26px] sm:h-11 bg-[repeating-linear-gradient(90deg,#FFD8CF_0px,#FFD8CF_33px,#FF917F_33px,#FF917F_66px)] sm:bg-[repeating-linear-gradient(90deg,#FFD8CF_0px,#FFD8CF_55px,#FF917F_55px,#FF917F_110px)]"
    />
  );
}
