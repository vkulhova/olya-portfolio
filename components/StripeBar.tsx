/* Repeating peach stripe bar used between sections. Phones get a shorter bar
   (14px, matching the frill ribbon) with narrower stripes — 35px puts a little
   over ten of them across a 375px screen — while staying wide enough to read
   as rectangles rather than squares. Desktop keeps the original 55px.

   Both colours come from Studio; the gradient itself lives in .stripe-bar,
   which is the only place that can hold the two stripe widths. */
export default function StripeBar({
  light,
  dark,
}: {
  light?: string;
  dark?: string;
}) {
  return (
    <div
      className="stripe-bar w-full h-[14px] sm:h-[22px]"
      style={
        {
          ...(light ? { "--stripe-a": light } : null),
          ...(dark ? { "--stripe-b": dark } : null),
        } as React.CSSProperties
      }
    />
  );
}
