import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import type { NavigationStep } from "@/shared/components/ui/navigation-steps";

import {
  type ProfileSettingsNavigationStepId,
  profileSettingsNavigationStepIds,
  profileSettingsNavigationSteps,
} from "../constants";

type UseProfileSettingsNavigationParams = {
  profileId: string | undefined;
  activeStep: ProfileSettingsNavigationStepId;
};

export function useProfileSettingsNavigation({
  profileId,
  activeStep,
}: UseProfileSettingsNavigationParams) {
  const navigate = useNavigate();

  const isReferencesStepDisabled = !profileId;

  const navigationSteps: NavigationStep<ProfileSettingsNavigationStepId>[] =
    useMemo(() => {
      return profileSettingsNavigationSteps.map((step) => {
        const isReferencesStep =
          step.id === profileSettingsNavigationStepIds.references;

        return {
          ...step,
          active: step.id === activeStep,
          disabled: isReferencesStep && isReferencesStepDisabled,
        };
      });
    }, [activeStep, isReferencesStepDisabled]);

  const handleNavigationStepClick = useCallback(
    (step: NavigationStep<ProfileSettingsNavigationStepId>) => {
      if (
        step.id === profileSettingsNavigationStepIds.references &&
        isReferencesStepDisabled
      ) {
        return;
      }

      if (step.id === profileSettingsNavigationStepIds.general) {
        navigate({
          to: "/profiles/settings",
          search: { profileId },
          replace: true,
        });

        return;
      }

      navigate({
        to: "/profiles/settings/references",
        search: { profileId: profileId! },
        replace: true,
      });
    },
    [isReferencesStepDisabled, navigate, profileId],
  );

  return {
    navigationSteps,
    handleNavigationStepClick,
    isReferencesStepDisabled,
  };
}
