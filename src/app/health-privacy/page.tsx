import fs from "node:fs/promises";
import path from "node:path";

import LegalDocument from "@/components/marketing/legal-document";

export const metadata = {
  title: "Consumer Health Data Privacy Policy | Isofit",
  description: "What consumer health data Isofit collects, why, who processes it, and your rights over it.",
  alternates: { canonical: "/health-privacy" },
};

const POLICY_PATH = path.join(process.cwd(), "src/app/health-privacy/consumer-health-data-privacy-policy.md");

export default async function HealthPrivacyPage() {
  return <LegalDocument markdown={await fs.readFile(POLICY_PATH, "utf8")} />;
}
