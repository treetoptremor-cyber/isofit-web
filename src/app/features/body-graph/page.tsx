import DocPage from "@/components/marketing/doc-page";
import { Device, Plate } from "@/components/marketing/primitives";
import { HeatLegend } from "@/components/marketing/quicklog-demo";
import ScreenCrop from "@/components/marketing/screen-crop";
import { BODY_GRAPH_DOC } from "@/content/features";
import { docMetadata } from "@/lib/metadata";

export const metadata = docMetadata(BODY_GRAPH_DOC);

export default function BodyGraphPage() {
  return (
    <DocPage
      doc={BODY_GRAPH_DOC}
      trail={[{ href: "/features", label: "Features" }, { href: BODY_GRAPH_DOC.path, label: "Body graph" }]}
      media={{
        "how-it-works": (
          <Plate id="graph-figure-grid" caption="Front and back figures shaded by working sets per muscle.">
            <Device
              priority
              src="/screenshots/body-graph.png"
              alt="Isofit's body graph: front and back body figures with each muscle shaded from pale to terracotta by working sets logged, above a sets-by-muscle list and 7, 30, 90 day and all-time filters."
            />
            <HeatLegend className="mt-5 justify-center" />
          </Plate>
        ),
      }}
      wide={{
        gaps: (
          <ScreenCrop
            src="/screenshots/muscle-detail.png"
            top={0.6}
            height={0.235}
            alt="The muscle detail panel in Isofit's body graph: Hamstrings over the last 7 days, with 2 weighted sets, 2.0 sets a week and 5.0 average effort, above an Ask Atlas about hamstrings button."
            caption="Tap a muscle and its panel shows the sets it got in the window, then hands the question to Atlas."
          />
        ),
        "what-you-see": (
          <ScreenCrop
            src="/screenshots/sets-by-muscle.png"
            top={0.555}
            height={0.29}
            alt="The lower half of Isofit's body graph. A Sets by muscle list reads Side Delts 11, Triceps 10, Glutes 9, Biceps 8, Front Delts 8. Beside it a 7D, 30D, 90D and ALL filter sits above cards for Total sets 45, Most worked Side Delts and Least worked Upper Back."
            caption="Sets by muscle, the four time windows, and the most and least worked muscle."
          />
        ),
      }}
    />
  );
}
