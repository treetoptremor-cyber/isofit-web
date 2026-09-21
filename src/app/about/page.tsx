import Image from "next/image";

import DocPage from "@/components/marketing/doc-page";
import { ABOUT_DOC } from "@/content/about";
import { docMetadata } from "@/lib/metadata";

export const metadata = docMetadata(ABOUT_DOC);

export default function AboutPage() {
  return (
    <DocPage
      doc={ABOUT_DOC}
      trail={[{ href: "/about", label: "About" }]}
      media={{
        why: (
          <div className="overflow-hidden rounded-[1.75rem] border border-rule bg-paper-raised shadow-[0_18px_40px_rgba(42,36,32,0.06)]">
            <Image
              src="/atlas/coach-rack.png"
              alt="Illustration of Isofit's coach standing under a loaded barbell in a squat rack, wearing a white polo with the ISO cube mark."
              width={1126}
              height={2000}
              sizes="(max-width: 1023px) 100vw, 384px"
              className="h-auto w-full"
            />
          </div>
        ),
      }}
    />
  );
}
