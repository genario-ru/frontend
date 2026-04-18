import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetProductionStatuses } from "@/actions/production-statuses/hooks/use-get-production-statuses";
import { useGetScenario } from "@/actions/scenario/hooks/use-get-scenario";
import { useUpdateScenario } from "@/actions/scenario/hooks/use-update-scenario";
import { getApiV1ScenariosByScenarioIdQueryKey } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseScenarioAppMenubarStatusSubmenuParams = {
  scenarioId: string;
  handleDropdownMenuClose: () => void;
};

export function useScenarioAppMenubarStatusSubmenu({
  scenarioId,
  handleDropdownMenuClose,
}: UseScenarioAppMenubarStatusSubmenuParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const [activeProductionStatusId, setActiveProductionStatusId] = useState<
    string | null
  >(null);

  const { scenarioData } = useGetScenario({ scenarioId });
  const { productionStatusesData } = useGetProductionStatuses("scenario");
  const { updateScenario, isUpdateScenarioPending } = useUpdateScenario();

  const productionStatuses = useMemo(() => {
    return productionStatusesData?.data ?? [];
  }, [productionStatusesData]);

  const activeProductionStatus = useMemo(() => {
    return productionStatuses.find(
      (status) => status.id === activeProductionStatusId,
    );
  }, [productionStatuses, activeProductionStatusId]);

  const handleSelectStatus = useCallback(
    (newProductionStatusId: string) => {
      const previousProductionStatusId = activeProductionStatusId;

      if (previousProductionStatusId === newProductionStatusId) {
        return;
      }

      setActiveProductionStatusId(newProductionStatusId);

      updateScenario(
        {
          scenarioId,
          data: { productionStatusId: newProductionStatusId },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getApiV1ScenariosByScenarioIdQueryKey({
                scenarioId,
              }),
            });

            handleDropdownMenuClose();
          },
          onError: () => {
            setActiveProductionStatusId(previousProductionStatusId);

            showErrorToast({
              description: "Произошла ошибка при обновлении статуса сценария",
            });
          },
        },
      );
    },
    [
      scenarioId,
      activeProductionStatusId,
      queryClient,
      updateScenario,
      handleDropdownMenuClose,
      showErrorToast,
    ],
  );

  useEffect(() => {
    if (scenarioData?.data) {
      setActiveProductionStatusId(scenarioData.data.productionStatusId);
    }
  }, [scenarioData]);

  return {
    productionStatuses,
    activeProductionStatus,
    isUpdateScenarioPending,
    handleSelectStatus,
  };
}
