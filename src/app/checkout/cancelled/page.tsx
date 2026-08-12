import { ReturnLanding } from "@/components/return-landing";

export const metadata = {
  title: "Checkout cancelled | Isofit",
  robots: { index: false },
};

export default function CheckoutCancelledPage() {
  return (
    <ReturnLanding
      title="Checkout cancelled."
      message="No charge was made — your plan is unchanged."
    />
  );
}
