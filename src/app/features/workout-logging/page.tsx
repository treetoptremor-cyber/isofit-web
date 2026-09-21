import DocPage from "@/components/marketing/doc-page";
import { Device, Plate } from "@/components/marketing/primitives";
import QuicklogDemo from "@/components/marketing/quicklog-demo";
import ScreenCrop from "@/components/marketing/screen-crop";
import { LOGGING_DOC } from "@/content/features";
import { docMetadata } from "@/lib/metadata";

export const metadata = docMetadata(LOGGING_DOC);

export default function WorkoutLoggingPage() {
  return (
    <DocPage
      doc={LOGGING_DOC}
      trail={[{ href: "/features", label: "Features" }, { href: LOGGING_DOC.path, label: "Workout logging" }]}
      media={{
        quicklog: <QuicklogDemo />,
        "what-you-can-record": (
          <Plate id="logging-log-grid" caption="Today's session in the Log tab, with the Quicklog bar and microphone at the bottom.">
            <Device
              priority
              src="/screenshots/log.png"
              alt="Isofit's Log tab showing today's session with back squat, overhead press and incline bench rows, each with sets, reps, pounds and RPE, start and rest timers, a Finish session button, and a Quicklog text bar beside a microphone button."
            />
          </Plate>
        ),
      }}
      wide={{
        "three-ways": (
          <ScreenCrop
            src="/screenshots/log.png"
            top={0.212}
            height={0.292}
            alt="Three exercise rows in Isofit's logger. Back Squat: 3 sets, 8 reps, 185 lbs, RPE 7. Overhead Press: 3 sets, 10 reps, 95 lbs, RPE 7. Incline Bench: 3 sets, 8 reps, 50 lbs, RPE 7. Each row has a Start button and a Rest button."
            caption="Three rows on the session board. Every exercise carries its own Start and Rest timers."
          />
        ),
        "routines-history-offline": (
          <ScreenCrop
            src="/screenshots/history.png"
            top={0.25}
            height={0.27}
            alt="A logged session in Isofit history dated 08 September 26 and marked Followed plan: Lat Pulldown 2x10 at 80 lb, 1x10 at 110 lb and 3x8 at 120 lb, Seated Cable Row 4x6 at 140 lb, Barbell Curl 3x8 at 50 lb, Seated Dumbbell Shoulder Press 3x10 at 40 lb, Incline Dumbbell Press 5x10 at 40 lb, and Dumbbell shoulder rotation 3x10 at 15 lb."
            caption="One session as the history list shows it. Hold it to edit or delete."
          />
        ),
      }}
    />
  );
}
