import { WaitlistLandingSectionHeader } from "../../waitlist-landing-section-header/components/waitlist-landing-section-header";

const WAITLIST_LANDING_PROBLEM_TITLE =
  "Общий ИИ и текущие сервисы не закрывают задачу";

const WAITLIST_LANDING_PROBLEM_DESCRIPTION =
  "Открываете ChatGPT или очередной сервис — получаете общий текст, который не про вас и не про то, как вы снимаете. Это мы и исправляем.";

export function WaitlistLandingProblemHeader() {
  return (
    <WaitlistLandingSectionHeader
      title={WAITLIST_LANDING_PROBLEM_TITLE}
      description={WAITLIST_LANDING_PROBLEM_DESCRIPTION}
    />
  );
}
