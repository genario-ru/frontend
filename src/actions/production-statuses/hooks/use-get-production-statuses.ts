import { useGetApiV1ProductionStatuses } from "@/codegen/api/product";
import type { GetApiV1ProductionStatusesQueryParamsEntityEnumKey } from "@/codegen/api/product/models";

export function useGetProductionStatuses(
  entity: GetApiV1ProductionStatusesQueryParamsEntityEnumKey,
) {
  const {
    data: productionStatusesData,
    isLoading: isProductionStatusesLoading,
    isError: isProductionStatusesError,
  } = useGetApiV1ProductionStatuses({
    params: { entity },
  });

  return {
    productionStatusesData,
    isProductionStatusesLoading,
    isProductionStatusesError,
  };
}
