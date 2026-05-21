import landingPersonalizationFeatureImage from "@/assets/images/landing-personalization-feature.jpg";

import type { LandingPersonalizationFeature } from "../types/landing-personalization-feature";

export const landingPersonalizationFeatures: LandingPersonalizationFeature[] = [
  {
    image: landingPersonalizationFeatureImage,
    title: "Настройка под канал и стиль",
    description:
      "Genario учитывает формат канала, тон общения и требования к подаче. Благодаря этому идеи, сценарии и метаданные получаются ближе к вашему стилю уже на первом черновике.",
  },
  {
    image: landingPersonalizationFeatureImage,
    title: "Подготовка под вашу аудиторию",
    description:
      "Можно задать тему, нишу и портрет зрителя, чтобы сервис опирался не на усреднённую заготовку, а на вашу реальную аудиторию. Это помогает быстрее получать более уместные и рабочие заготовки для видео.",
    inverseOrder: true,
  },
];
