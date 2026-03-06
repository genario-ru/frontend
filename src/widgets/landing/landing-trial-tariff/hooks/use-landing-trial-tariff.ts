import { useGetTrialTariff } from "@/actions/tariffs/hooks/use-get-trial-tariff";

export function useLandingTrialTariff() {
  const { trialTariffData, isTrialTariffLoading } = useGetTrialTariff();

  return {
    trialTariffData,
    isTrialTariffLoading,
  };
}
