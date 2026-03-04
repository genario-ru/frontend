import { useGetTariffs } from "@/actions/tariffs/hooks/use-get-tariffs";

export function useLandingTariffsList() {
  const { tariffsData, isTariffsLoading } = useGetTariffs();

  return {
    tariffsData,
    isTariffsLoading,
  };
}
