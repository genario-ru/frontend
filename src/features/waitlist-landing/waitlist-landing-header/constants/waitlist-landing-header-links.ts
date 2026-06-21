import type { NavigateOptions } from "@tanstack/react-router";

type WaitlistLandingHeaderLink = {
  label: string;
  navigateOptions: NavigateOptions;
};

export const waitlistLandingHeaderLinks: WaitlistLandingHeaderLink[] = [
  {
    label: "Зачем",
    navigateOptions: {
      to: "/",
      hash: "problem",
    },
  },
  {
    label: "Возможности",
    navigateOptions: {
      to: "/",
      hash: "possibilities",
    },
  },
  {
    label: "Ранний доступ",
    navigateOptions: {
      to: "/",
      hash: "waitlist-form",
    },
  },
];
