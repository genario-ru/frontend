import { WaitlistLandingSectionHeader } from "../../waitlist-landing-section-header/components/waitlist-landing-section-header";

const WAITLIST_LANDING_POSSIBILITIES_TITLE = "С чем поможет Genario";

const WAITLIST_LANDING_POSSIBILITIES_DESCRIPTION =
  "Ранняя версия уже помогает пройти ключевые этапы выпуска: от идеи и сценария до плана монтажа, метаданных и обложки.";

export function WaitlistLandingPossibilitiesHeader() {
  return (
    <WaitlistLandingSectionHeader
      title={WAITLIST_LANDING_POSSIBILITIES_TITLE}
      description={WAITLIST_LANDING_POSSIBILITIES_DESCRIPTION}
      inverseColors={true}
    />
  );
}
