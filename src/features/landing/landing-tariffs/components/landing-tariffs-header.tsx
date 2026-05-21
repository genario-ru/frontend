import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";

const LANDING_TARIFFS_TITLE = "Тарифы";
const LANDING_TARIFFS_DESCRIPTION =
  "Выберите подходящий тариф по объёму подготовки, количеству генераций и формату работы: для первых тестов, регулярного выпуска или команды.";

export function LandingTariffsHeader() {
  return (
    <LandingSectionHeader
      inverseColors
      title={LANDING_TARIFFS_TITLE}
      description={LANDING_TARIFFS_DESCRIPTION}
    />
  );
}
