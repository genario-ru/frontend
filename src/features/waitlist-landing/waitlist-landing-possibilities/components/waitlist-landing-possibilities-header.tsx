import { WaitlistLandingSectionHeader } from "../../waitlist-landing-section-header/components/waitlist-landing-section-header";

const WAITLIST_LANDING_POSSIBILITIES_TITLE = "С чем поможет Genario";

const WAITLIST_LANDING_POSSIBILITIES_DESCRIPTION =
  "Genario помогает не просто генерировать отдельные куски, а последовательно собрать всю базу для видео: что снимать, как монтировать и как упаковать видео под публикацию.";

export function WaitlistLandingPossibilitiesHeader() {
  return (
    <WaitlistLandingSectionHeader
      title={WAITLIST_LANDING_POSSIBILITIES_TITLE}
      description={WAITLIST_LANDING_POSSIBILITIES_DESCRIPTION}
      inverseColors={true}
    />
  );
}
