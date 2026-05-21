import profileSettingsFeatureImage from "@/assets/images/profile-settings-feature.jpg";
import profilesImportFeatureImage from "@/assets/images/profiles-import-feature.jpg";

import type { LandingPersonalizationFeature } from "../types/landing-personalization-feature";

export const landingPersonalizationFeatures: LandingPersonalizationFeature[] = [
  {
    image: profilesImportFeatureImage,
    title: "Импорт профилей каналов",
    description:
      "Добавьте ссылки на свои каналы, а Genario поможет быстро создать профили для дальнейшей работы. Это упрощает старт, экономит время на ручной перенос данных и помогает быстрее перейти к подготовке контента.",
  },
  {
    image: profileSettingsFeatureImage,
    title: "Ручная настройка профиля",
    description:
      "Профиль можно детально настроить вручную: указать тематику канала, стиль подачи, платформы, тональность и аудиторию. Благодаря этому идеи, сценарии и метаданные получаются ближе к вашему реальному формату уже с первого черновика.",
    inverseOrder: true,
  },
];
