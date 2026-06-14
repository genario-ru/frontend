import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";

const LANDING_TARIFFS_TITLE = "Тарифы";
const LANDING_TARIFFS_DESCRIPTION =
  "Выберите подходящий тариф по количеству профилей, генераций и формату работы: для первых тестов, регулярного выпуска или команды. Если Genario не подойдёт — вернём деньги за первый месяц, без лишних вопросов.";

export function LandingTariffsHeader() {
  return (
    <LandingSectionHeader
      inverseColors
      title={LANDING_TARIFFS_TITLE}
      description={LANDING_TARIFFS_DESCRIPTION}
    />
  );
}
