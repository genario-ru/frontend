import type { NavigateOptions } from "@tanstack/react-router";

type WaitlistLandingHeaderLink = {
  label: string;
  navigateOptions: NavigateOptions;
};

export const waitlistLandingHeaderLinks: WaitlistLandingHeaderLink[] = [
  {
    label: "Зачем",
    navigateOptions: {
      to: "/waitlist",
      hash: "problem",
    },
  },
  {
    label: "Возможности",
    navigateOptions: {
      to: "/waitlist",
      hash: "possibilities",
    },
  },
  {
    label: "Ранний доступ",
    navigateOptions: {
      to: "/waitlist",
      hash: "waitlist-form",
    },
  },
];
