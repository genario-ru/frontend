import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";

const LANDING_POSSIBILITIES_TITLE = "Возможности Genario";

const LANDING_POSSIBILITIES_DESCRIPTION =
  "Соберите идеи, сценарий, метаданные и обложку в одном процессе, чтобы быстрее перейти к съёмке и выпуску видео.";

export function LandingPossibilitiesHeader() {
  return (
    <LandingSectionHeader
      title={LANDING_POSSIBILITIES_TITLE}
      description={LANDING_POSSIBILITIES_DESCRIPTION}
      inverseColors={true}
    />
  );
}
