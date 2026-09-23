import Image from "next/image";

import DocPage from "@/components/marketing/doc-page";
import ScreenCrop from "@/components/marketing/screen-crop";
import { ATLAS_DOC } from "@/content/features";
import { docMetadata } from "@/lib/metadata";

export const metadata = docMetadata(ATLAS_DOC);

export default function AtlasPage() {
  return (
    <DocPage
      doc={ATLAS_DOC}
      trail={[{ href: "/features", label: "Features" }, { href: ATLAS_DOC.path, label: "Atlas" }]}
      aside={
        <figure className="mx-auto w-56 lg:w-full">
          <div className="overflow-hidden rounded-[1.75rem] border border-terra/20 bg-terra-soft shadow-[0_18px_40px_rgba(42,36,32,0.06)]">
            <Image
              src="/atlas/coach-hello.png"
              alt="Illustration of Atlas, Isofit's AI coach, drawn as a coach in a white polo with the blue ISO cube mark, one hand open in welcome."
              width={1254}
              height={1254}
              sizes="(max-width: 1023px) 224px, 352px"
              priority
              className="h-auto w-full"
            />
          </div>
          <figcaption className="caption mt-3">Atlas, as the app draws it. The real conversation is below.</figcaption>
        </figure>
      }
      wide={{
        "what-atlas-does": (
          <ScreenCrop
            priority
            tone="atlas"
            src="/screenshots/atlas.png"
            top={0.182}
            height={0.585}
            alt="An Atlas conversation. The member says they just logged a session of lat pulldowns, seated cable rows, barbell curls and shoulder presses, and asks what to change next time. Atlas replies to put the incline dumbbell press before the pulling work, calls five sets at RPE 6 reasonable, suggests reducing back volume slightly, and says to keep the shoulder press light and strictly pain-free."
            caption="A question about the session just logged, answered against that session."
          />
        ),
      }}
    />
  );
}
