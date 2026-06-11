import { StatusPage } from "@/components/pwa/status-page";

export const metadata = {
  title: "ISO Sync Success | ISOfit",
};

export default function IsoSyncSuccessPage() {
  return (
    <StatusPage
      title="ISO Sync"
      message="ISO Sync activated."
      linkHref="/log"
      linkLabel="Back to logger"
    />
  );
}
