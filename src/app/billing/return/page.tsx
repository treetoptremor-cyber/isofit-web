import { ReturnLanding } from "@/components/return-landing";

export const metadata = {
  title: "Billing | Isofit",
  robots: { index: false },
};

export default function BillingReturnPage() {
  return (
    <ReturnLanding
      title="All set."
      message="Your membership changes are in — check the app for the latest."
    />
  );
}
