import { StatusPage } from "@/components/pwa/status-page";

export const metadata = {
  title: "ISO Sync Cancelled | Isofit",
};

export default function IsoSyncCancelPage() {
  return (
    <StatusPage
      title="ISO Sync"
      message="No changes were made."
      linkHref="/"
      linkLabel="Back to home"
    />
  );
}
