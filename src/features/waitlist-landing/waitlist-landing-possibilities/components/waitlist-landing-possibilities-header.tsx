import { WaitlistLandingSectionHeader } from "../../waitlist-landing-section-header/components/waitlist-landing-section-header";

const WAITLIST_LANDING_POSSIBILITIES_TITLE = "Что будет уметь Genario";

const WAITLIST_LANDING_POSSIBILITIES_DESCRIPTION =
  "Мы перестраиваем продукт вокруг одного: чтобы результат был ваш, а не сгенерированный «в среднем» — от идеи до монтажа.";

export function WaitlistLandingPossibilitiesHeader() {
  return (
    <WaitlistLandingSectionHeader
      title={WAITLIST_LANDING_POSSIBILITIES_TITLE}
      description={WAITLIST_LANDING_POSSIBILITIES_DESCRIPTION}
      inverseColors={true}
    />
  );
}
