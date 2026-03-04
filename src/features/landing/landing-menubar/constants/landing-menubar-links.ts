import type { NavigateOptions } from "@tanstack/react-router";

type LandingMenubarLink = {
  label: string;
  navigateOptions: NavigateOptions;
};

export const landingMenubarLinks: LandingMenubarLink[] = [
  {
    label: "Возможности",
    navigateOptions: {
      to: "/",
      hash: "possibilities",
    },
  },
  {
    label: "Шаблоны",
    navigateOptions: {
      to: "/",
      hash: "templates",
    },
  },
  {
    label: "Персонализация",
    navigateOptions: {
      to: "/",
      hash: "personalization",
    },
  },
  {
    label: "Тарифы",
    navigateOptions: {
      to: "/",
      hash: "tariffs",
    },
  },
  {
    label: "Вопросы и ответы",
    navigateOptions: {
      to: "/",
      hash: "faq",
    },
  },
];
