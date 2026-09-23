import DocPage from "@/components/marketing/doc-page";
import { Device, Plate } from "@/components/marketing/primitives";
import { BONFIRE_DOC } from "@/content/features";
import { docMetadata } from "@/lib/metadata";

export const metadata = docMetadata(BONFIRE_DOC);

export default function BonfirePage() {
  return (
    <DocPage
      doc={BONFIRE_DOC}
      trail={[{ href: "/features", label: "Features" }, { href: BONFIRE_DOC.path, label: "Bonfire" }]}
      aside={
        <Plate caption="A post is a session someone actually logged, with a photo and a tag.">
          <Device
            priority
            src="/screenshots/bonfire.png"
            alt="Isofit's Bonfire tab showing the Home and Embers feed toggle, a search bar for members and categories, a New post button, and a post by @treetoptremor with a barbell squat photo captioned Barbell squat 3x5 225lbs, tagged strength."
          />
        </Plate>
      }
    />
  );
}
