import { useGetTariffs } from "@/actions/tariffs/hooks/use-get-tariffs";
import { useGetTrialTariff } from "@/actions/tariffs/hooks/use-get-trial-tariff";

export function useLandingTariffsList() {
  const { tariffsData, isTariffsLoading } = useGetTariffs();
  const { trialTariffData, isTrialTariffLoading } = useGetTrialTariff();

  return {
    tariffsData,
    trialTariffData,
    isTariffsLoading,
    isTrialTariffLoading,
  };
}
