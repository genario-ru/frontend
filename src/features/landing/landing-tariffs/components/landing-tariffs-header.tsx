import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";

const LANDING_TARIFFS_HEADER_TITLE = "Тарифы";

const LANDING_TARIFFS_HEADER_DESCRIPTION =
  "Создавайте сценарии для видео за минуты, а не часы, Создавайте сценарии для видео за минуты, а не часы, Создавайте сценарии";

export function LandingTariffsHeader() {
  return (
    <LandingSectionHeader
      inverseColors
      title={LANDING_TARIFFS_HEADER_TITLE}
      description={LANDING_TARIFFS_HEADER_DESCRIPTION}
    />
  );
}
