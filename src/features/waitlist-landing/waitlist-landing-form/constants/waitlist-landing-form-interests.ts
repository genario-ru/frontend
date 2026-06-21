import type { ReactNode } from "react";

type WaitlistLandingFormInterest = {
  value: string;
  children: ReactNode;
};

export const waitlistLandingFormInterests: WaitlistLandingFormInterest[] = [
  { value: "channel-import", children: "Импорт моего канала" },
  { value: "media-upload", children: "Загрузка своих видео и фото" },
  { value: "style-personalization", children: "Персонализация под мой стиль" },
  { value: "shooting-and-editing", children: "Сценарий под съёмку и монтаж" },
  { value: "covers-and-previews", children: "Обложки и превью сцен" },
  { value: "trend-ideas", children: "Идеи на основе трендов" },
  { value: "platform-metadata", children: "Метаданные под площадки" },
  { value: "team-access", children: "Командный доступ" },
];
