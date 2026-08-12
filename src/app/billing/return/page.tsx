import { ReturnLanding } from "@/components/return-landing";

export const metadata = {
  title: "Billing | Isofit",
  robots: { index: false },
};

export default function BillingReturnPage() {
  return (
    <ReturnLanding
      title="All set."
      message="You're done managing your membership. You can close this window and return to the Isofit app."
    />
  );
}
