import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";

const LANDING_PERSONALIZATION_TITLE = "Пишет в вашем стиле, а не под копирку";
const LANDING_PERSONALIZATION_DESCRIPTION =
  "Подключите канал по ссылке или заполните профиль вручную, и Genario подхватит вашу тему, тон и аудиторию. Дальше каждая идея и сценарий звучат как продолжение вашего канала.";

export function LandingPersonalizationHeader() {
  return (
    <LandingSectionHeader
      title={LANDING_PERSONALIZATION_TITLE}
      description={LANDING_PERSONALIZATION_DESCRIPTION}
    />
  );
}
