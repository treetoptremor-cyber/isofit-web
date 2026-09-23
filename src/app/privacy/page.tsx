import fs from "node:fs/promises";
import path from "node:path";

import LegalDocument from "@/components/marketing/legal-document";

export const metadata = {
  title: "Privacy Policy | Isofit",
  description: "How Isofit collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
};

const POLICY_PATH = path.join(process.cwd(), "src/app/privacy/privacy-policy.md");

export default async function PrivacyPage() {
  return <LegalDocument markdown={await fs.readFile(POLICY_PATH, "utf8")} />;
}
