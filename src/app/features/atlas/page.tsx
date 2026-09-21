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
      wide={{
        "what-atlas-does": (
          <ScreenCrop
            priority
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
