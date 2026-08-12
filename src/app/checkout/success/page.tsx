import { ReturnLanding } from "@/components/return-landing";

export const metadata = {
  title: "Payment confirmed | Isofit",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <ReturnLanding
      title="You're in."
      message="Payment confirmed — your membership is active. You can close this window and return to the Isofit app."
    />
  );
}
