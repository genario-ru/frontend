import { useGetOnboarding } from "@/actions/onboarding/hooks/use-get-onboarding";

export function useHomeOnboarding() {
  const { onboardingData, isOnboardingLoading, isOnboardingError } =
    useGetOnboarding();

  return {
    onboardingData,
    isOnboardingLoading,
    isOnboardingError,
  };
}
