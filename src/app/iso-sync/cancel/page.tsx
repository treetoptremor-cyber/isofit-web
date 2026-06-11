import { StatusPage } from "@/components/pwa/status-page";

export const metadata = {
  title: "ISO Sync Cancelled | ISOfit",
};

export default function IsoSyncCancelPage() {
  return (
    <StatusPage
      title="ISO Sync"
      message="No changes were made."
      linkHref="/log"
      linkLabel="Back to logger"
    />
  );
}
