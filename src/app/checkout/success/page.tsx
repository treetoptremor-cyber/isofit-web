import { ReturnLanding } from "@/components/return-landing";

export const metadata = {
  title: "Payment confirmed | Isofit",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <ReturnLanding
      title="You're in."
      message="Payment confirmed — your membership is active."
    />
  );
}
