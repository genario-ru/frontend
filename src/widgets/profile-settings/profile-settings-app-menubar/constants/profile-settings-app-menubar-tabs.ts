export const profileSettingsAppMenubarTabSlugs = {
  general: "general",
  references: "references",
} as const;

export type ProfileSettingsAppMenubarTabSlug =
  (typeof profileSettingsAppMenubarTabSlugs)[keyof typeof profileSettingsAppMenubarTabSlugs];

export type ProfileSettingsAppMenubarTabRoute =
  | "/profiles/settings"
  | "/profiles/settings/references";

export type ProfileSettingsAppMenubarTabDefinition = {
  slug: ProfileSettingsAppMenubarTabSlug;
  label: string;
  to: ProfileSettingsAppMenubarTabRoute;
};

export const profileSettingsAppMenubarTabsDefinition: readonly ProfileSettingsAppMenubarTabDefinition[] =
  [
    {
      slug: profileSettingsAppMenubarTabSlugs.general,
      label: "Общая информация",
      to: "/profiles/settings",
    },
    {
      slug: profileSettingsAppMenubarTabSlugs.references,
      label: "Референсы",
      to: "/profiles/settings/references",
    },
  ];
