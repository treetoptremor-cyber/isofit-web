import fs from "node:fs/promises";
import path from "node:path";

import LegalDocument from "@/components/marketing/legal-document";

export const metadata = {
  title: "Terms of Service | Isofit",
  description: "The terms that govern your use of Isofit.",
  alternates: { canonical: "/terms" },
};

const POLICY_PATH = path.join(process.cwd(), "src/app/terms/terms-of-service.md");

export default async function TermsPage() {
  return <LegalDocument markdown={await fs.readFile(POLICY_PATH, "utf8")} />;
}
