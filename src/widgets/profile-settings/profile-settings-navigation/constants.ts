export const profileSettingsNavigationStepIds = {
  general: "general",
  references: "references",
} as const;

export type ProfileSettingsNavigationStepId =
  (typeof profileSettingsNavigationStepIds)[keyof typeof profileSettingsNavigationStepIds];

export const profileSettingsNavigationSteps = [
  {
    id: profileSettingsNavigationStepIds.general,
    label: "Общая информация",
  },
  {
    id: profileSettingsNavigationStepIds.references,
    label: "Референсы",
  },
] as const;
