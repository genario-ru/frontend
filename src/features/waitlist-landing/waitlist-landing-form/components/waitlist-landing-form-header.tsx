import { WaitlistLandingSectionHeader } from "../../waitlist-landing-section-header/components/waitlist-landing-section-header";

const WAITLIST_LANDING_FORM_TITLE = "Оставьте заявку на ранний доступ";

const WAITLIST_LANDING_FORM_DESCRIPTION =
  "Когда откроем доступ, пришлём приглашение на email. А ваши ответы подскажут, на что нам обратить внимание в первую очередь.";

export function WaitlistLandingFormHeader() {
  return (
    <WaitlistLandingSectionHeader
      title={WAITLIST_LANDING_FORM_TITLE}
      description={WAITLIST_LANDING_FORM_DESCRIPTION}
    />
  );
}
