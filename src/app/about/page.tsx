import DocPage from "@/components/marketing/doc-page";
import FounderProfile from "@/components/marketing/founder";
import { ABOUT_DOC } from "@/content/about";
import { FOUNDER } from "@/content/positioning";
import { docMetadata } from "@/lib/metadata";

export const metadata = docMetadata(ABOUT_DOC);

export default function AboutPage() {
  return (
    <DocPage
      doc={ABOUT_DOC}
      trail={[{ href: "/about", label: "About" }]}
      replace={{ founder: <FounderProfile section={FOUNDER} /> }}
    />
  );
}
