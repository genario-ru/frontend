import { useGetApiV1TariffsTrial } from "@/codegen/api/product";

export function useGetTrialTariff() {
  const { data: trialTariffData, isLoading: isTrialTariffLoading } =
    useGetApiV1TariffsTrial();

  return {
    trialTariffData,
    isTrialTariffLoading,
  };
}
