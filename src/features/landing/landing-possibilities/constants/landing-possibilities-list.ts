import {
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
      "Описание генерации идей, Описание генерации идей, Описание генерации идей, Описание генерации идей, Описание генерации идей, Описани",
  },
  {
    icon: FileVideoCameraIcon,
    iconColor: "#00c0e8",
    title: "Создание сценариев",
    description:
      "Описание генерации идей, Описание генерации идей, Описание генерации идей, Описание генерации идей, Описание генерации идей, Описани",
  },
  {
    icon: ImagePlay,
    iconColor: "#34c759",
    title: "Отрисовка обложек",
    description:
      "Описание генерации идей, Описание генерации идей, Описание генерации идей, Описание генерации идей, Описание генерации идей, Описани",
    disabled: true,
    soon: true,
  },
];
