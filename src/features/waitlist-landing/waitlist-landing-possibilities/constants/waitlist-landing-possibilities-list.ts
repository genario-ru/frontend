import {
  DownloadIcon,
  FileTextIcon,
  FileVideoCameraIcon,
  ImagePlay,
  LightbulbIcon,
  ListVideoIcon,
  type LucideIcon,
} from "lucide-react";

type WaitlistLandingPossibility = {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  disabled?: boolean;
};

export const waitlistLandingPossibilitiesList: WaitlistLandingPossibility[] = [
  {
    icon: DownloadIcon,
    iconColor: "#00c0e8",
    title: "Понимает канал и материалы",
    description:
      "Подключает YouTube или RuTube и принимает ваши видео, фото, обложки и визуальные референсы.",
  },
  {
    icon: LightbulbIcon,
    iconColor: "#a5b4fc",
    title: "Находит идеи под аудиторию",
    description:
      "Предлагает темы и заходы на основе ниши, аудитории и того, что уже сработало в вашем контенте.",
  },
  {
    icon: FileVideoCameraIcon,
    iconColor: "#ffcc00",
    title: "Пишет сценарий под съёмку",
    description:
      "Даёт структуру, реплики, сцены и понятные подсказки: что говорить, как снимать и какие кадры нужны.",
  },
  {
    icon: FileTextIcon,
    iconColor: "#ff9500",
    title: "Помогает собрать монтаж",
    description:
      "После съёмки раскладывает выпуск по сценам: порядок склейки, вставки, анимации и текст на экране.",
  },
  {
    icon: ListVideoIcon,
    iconColor: "#34c759",
    title: "Готовит метаданные",
    description:
      "Подбирает заголовки, описания и теги под YouTube, RuTube, Shorts и другие форматы публикации.",
  },
  {
    icon: ImagePlay,
    iconColor: "#34c759",
    title: "Делает обложки",
    description:
      "Использует ваши фото, референсы и стиль канала, чтобы собрать кликабельное превью.",
  },
];
