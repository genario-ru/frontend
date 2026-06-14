import { useGetOnboarding } from "@/actions/onboarding/hooks/use-get-onboarding";
import { useHideOnboarding } from "@/actions/onboarding/hooks/use-hide-onboarding";

export function useHomeOnboarding() {
  const { onboardingData, isOnboardingLoading, isOnboardingError } =
    useGetOnboarding();

  const { handleHideOnboarding, isHideOnboardingPending } = useHideOnboarding();

  return {
    onboardingData,
    isOnboardingLoading,
    isOnboardingError,
    isHideOnboardingPending,
    handleHideOnboarding,
  };
}
