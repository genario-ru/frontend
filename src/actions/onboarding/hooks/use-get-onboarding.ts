import { useGetApiV1Onboarding } from "@/codegen/api/product";

type UseGetOnboardingParams = {
  enabled?: boolean;
};

export function useGetOnboarding({ enabled }: UseGetOnboardingParams = {}) {
  const {
    data: onboardingData,
    isLoading: isOnboardingLoading,
    isError: isOnboardingError,
  } = useGetApiV1Onboarding({
    query: {
      enabled,
    },
  });

  return {
    onboardingData,
    isOnboardingLoading,
    isOnboardingError,
  };
}
