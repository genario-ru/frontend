import { useGetApiV1CreditsPackages } from "@/codegen/api/product";

export function useGetCreditsPackages() {
  const {
    data: creditsPackagesData,
    isLoading: isCreditsPackagesLoading,
    isError: isCreditsPackagesError,
  } = useGetApiV1CreditsPackages();

  return {
    creditsPackagesData,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
  };
}
