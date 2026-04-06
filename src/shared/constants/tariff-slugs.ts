export const TARIFF_SLUGS = {
  TRIAL: "trial",
  BASIC: "basic",
  ADVANCED: "advanced",
} as const;

export type TariffSlug = (typeof TARIFF_SLUGS)[keyof typeof TARIFF_SLUGS];
