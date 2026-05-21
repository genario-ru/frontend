import {
  FileTextIcon,
  FileVideoCameraIcon,
  ImagePlay,
  LightbulbIcon,
  type LucideIcon,
} from "lucide-react";

type LandingPossiblity = {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  disabled?: boolean;
  soon?: boolean;
};

export const landingPossibilitiesList: LandingPossiblity[] = [
  {
    icon: LightbulbIcon,
    iconColor: "#ffcc00",
    title: "Генерация идей",
    description:
      "Опишите тему, формат и аудиторию, а Genario предложит идеи для видео с разными заходами и подачей. Вы быстрее находите рабочее направление и не начинаете подготовку с пустого листа.",
  },
  {
    icon: FileVideoCameraIcon,
    iconColor: "#00c0e8",
    title: "Создание сценариев",
    description:
      "На основе выбранной идеи сервис собирает структуру ролика, ключевые тезисы и логику повествования. Это помогает быстрее подготовиться к съёмке и не тратить часы на ручную сборку сценария.",
  },
  {
    icon: FileTextIcon,
    iconColor: "#ff9500",
    title: "Генерация метаданных",
    description:
      "После подготовки ролика Genario помогает собрать заголовок, описание и теги под публикацию. Так проще оформить видео для YouTube и других платформ без отдельного долгого этапа ручной доработки.",
  },
  {
    icon: ImagePlay,
    iconColor: "#34c759",
    title: "Отрисовка обложек",
    description:
      "Сервис помогает быстро собрать концепцию обложки под тему ролика и стиль канала. Вы получаете понятную основу для дизайна и быстрее доводите видео до публикации.",
    disabled: true,
    soon: true,
  },
];
