import type { NavigateOptions } from "@tanstack/react-router";

type LandingHeaderLink = {
  label: string;
  navigateOptions: NavigateOptions;
};

export const landingHeaderLinks: LandingHeaderLink[] = [
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
