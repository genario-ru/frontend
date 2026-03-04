import { useGetApiV1Tariffs } from "@/codegen/api/product";

export function useGetTariffs() {
  const { data: tariffsData, isLoading: isTariffsLoading } =
    useGetApiV1Tariffs();

  return {
    tariffsData,
    isTariffsLoading,
  };
}
