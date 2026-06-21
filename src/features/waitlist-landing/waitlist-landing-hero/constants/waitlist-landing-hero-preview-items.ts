import {
  ClapperboardIcon,
  FileTextIcon,
  ImageIcon,
  LightbulbIcon,
  ListVideoIcon,
  type LucideIcon,
} from "lucide-react";

type WaitlistLandingHeroPreviewItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
};

export const WAITLIST_LANDING_HERO_PREVIEW_TITLE =
  "Оптимизация всего процесса подготовки видео";

export const waitlistLandingHeroPreviewItems: WaitlistLandingHeroPreviewItem[] =
  [
    {
      icon: LightbulbIcon,
      label: "Идеи",
      value: "Темы и подачу под вашу нишу, аудиторию и прошлые ролики",
      color: "text-accent-4",
    },
    {
      icon: FileTextIcon,
      label: "Сценарий под съёмку",
      value: "Структура, реплики, сцены и подсказки по кадрам",
      color: "text-warning-6",
    },
    {
      icon: ClapperboardIcon,
      label: "План монтажа",
      value: "Порядок сцен, вставки, анимации и текст на экране",
      color: "text-positive-5",
    },
    {
      icon: ListVideoIcon,
      label: "Метаданные",
      value: "Заголовки, описания и теги под разные платформы",
      color: "text-accent-7",
    },
    {
      icon: ImageIcon,
      label: "Обложка",
      value: "Превью из ваших фото, референсов и фирменного стиля",
      color: "text-negative-5",
    },
  ];
