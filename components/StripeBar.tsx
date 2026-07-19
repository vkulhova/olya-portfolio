/* Thin repeating peach stripe bar used between sections */
export default function StripeBar() {
  return (
    <div
      className="w-full h-11"
      style={{
        background: "repeating-linear-gradient(90deg, #FED7C6 0px, #FED7C6 55px, #FFC3A9 55px, #FFC3A9 110px)",
      }}
    />
  );
}
