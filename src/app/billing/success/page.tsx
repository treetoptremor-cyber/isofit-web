import { StatusPage } from "@/components/pwa/status-page";

export const metadata = {
  title: "Billing Success | Isofit",
};

export default function BillingSuccessPage() {
  return (
    <StatusPage
      title="Billing updated"
      message="You're all set! Your plan has been upgraded."
      linkHref="/log"
      linkLabel="Back to logger"
    />
  );
}
