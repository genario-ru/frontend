import { WaitlistLandingSectionHeader } from "../../waitlist-landing-section-header/components/waitlist-landing-section-header";

const WAITLIST_LANDING_PROBLEM_TITLE = "Чего не хватает обычным генераторам";

const WAITLIST_LANDING_PROBLEM_DESCRIPTION =
  "Большинство инструментов помогает только с текстом. А автору всё равно приходится самому держать в голове контекст канала и отдельно заниматься съёмкой, монтажом, метаданными и обложкой.";

export function WaitlistLandingProblemHeader() {
  return (
    <WaitlistLandingSectionHeader
      title={WAITLIST_LANDING_PROBLEM_TITLE}
      description={WAITLIST_LANDING_PROBLEM_DESCRIPTION}
    />
  );
}
