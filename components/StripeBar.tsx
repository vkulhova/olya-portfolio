/* Thin repeating peach stripe bar used between sections */
export default function StripeBar() {
  return (
    <div
      className="w-full h-11"
      style={{
        background: "repeating-linear-gradient(90deg, #FFD8CF 0px, #FFD8CF 55px, #FF917F 55px, #FF917F 110px)",
      }}
    />
  );
}
