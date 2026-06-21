import {
  DownloadIcon,
  FileTextIcon,
  FileVideoCameraIcon,
  ImagePlay,
  type LucideIcon,
} from "lucide-react";

type WaitlistLandingPossibility = {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  disabled?: boolean;
  soon?: boolean;
};

export const waitlistLandingPossibilitiesList: WaitlistLandingPossibility[] = [
  {
    icon: DownloadIcon,
    iconColor: "#00c0e8",
    title: "Импорт вашего канала",
    description:
      "Подключите YouTube или RuTube — и Genario построит идеи и сценарии на основе вашего реального контента, тем и подачи.",
    soon: true,
  },
  {
    icon: ImagePlay,
    iconColor: "#34c759",
    title: "Загрузка своих видео и фото",
    description:
      "Нет импорта для вашей площадки? Загрузите примеры роликов, фотографии и опишите стилистику — продукт подстроится под вас.",
    soon: true,
  },
  {
    icon: FileVideoCameraIcon,
    iconColor: "#ffcc00",
    title: "Сценарий под съёмку и план монтажа",
    description:
      "Сначала — текст, по которому удобно снимать. Затем — план монтажа под отснятый материал. Так, как вы реально работаете.",
    soon: true,
  },
  {
    icon: FileTextIcon,
    iconColor: "#ff9500",
    title: "Обложки и превью сцен",
    description:
      "Быстрая генерация обложек и превью сцен под ваш бренд — без долгого ожидания и дорогих моделей.",
    soon: true,
  },
];
