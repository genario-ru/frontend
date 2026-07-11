import { NavigationSteps } from "@/shared/components/ui/navigation-steps";

import type { ProfileSettingsNavigationStepId } from "../constants";
import { useProfileSettingsNavigation } from "../hooks/use-profile-settings-navigation";

type ProfileSettingsNavigationProps = {
  profileId: string | undefined;
  activeStep: ProfileSettingsNavigationStepId;
};

export function ProfileSettingsNavigation({
  profileId,
  activeStep,
}: ProfileSettingsNavigationProps) {
  const { navigationSteps, handleNavigationStepClick } =
    useProfileSettingsNavigation({
      profileId,
      activeStep,
    });

  return (
    <NavigationSteps
      steps={navigationSteps}
      onStepClick={handleNavigationStepClick}
    />
  );
}
