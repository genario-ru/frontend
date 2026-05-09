export const billingAppMenubarTabSlugs = {
  subscription: "subscription",
  credits: "credits",
} as const;

export type BillingAppMenubarTabSlug =
  (typeof billingAppMenubarTabSlugs)[keyof typeof billingAppMenubarTabSlugs];

export type BillingAppMenubarTabRoute = "/billing" | "/billing/credits";

export type BillingAppMenubarTabDefinition = {
  slug: BillingAppMenubarTabSlug;
  label: string;
  to: BillingAppMenubarTabRoute;
};

export const billingAppMenubarTabsDefinition: readonly BillingAppMenubarTabDefinition[] =
  [
    {
      slug: billingAppMenubarTabSlugs.subscription,
      label: "Подписка и оплата",
      to: "/billing",
    },
    {
      slug: billingAppMenubarTabSlugs.credits,
      label: "Баланс и расходы",
      to: "/billing/credits",
    },
  ];
