import { StatusPage } from "@/components/pwa/status-page";

export const metadata = {
  title: "Billing Cancelled | Isofit",
};

export default function BillingCancelPage() {
  return (
    <StatusPage
      title="Billing update canceled"
      message="No changes were made."
      linkHref="/billing"
      linkLabel="Back to billing"
    />
  );
}
