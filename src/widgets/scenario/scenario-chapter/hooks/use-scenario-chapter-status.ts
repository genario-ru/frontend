import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetProductionStatuses } from "@/actions/production-statuses/hooks/use-get-production-statuses";
import { useGetScenarioChapter } from "@/actions/scenario/hooks/use-get-scenario-chapter";
import { useUpdateScenarioChapter } from "@/actions/scenario/hooks/use-update-scenario-chapter";
import { getApiV1ScenariosChaptersByChapterIdQueryKey } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseScenarioChapterStatusParams = {
  chapterId: string;
};

export function useScenarioChapterStatus({
  chapterId,
}: UseScenarioChapterStatusParams) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const [activeProductionStatusId, setActiveProductionStatusId] = useState<
    string | null
  >(null);

  const { scenarioChapterData, isScenarioChapterLoading } =
    useGetScenarioChapter({ chapterId });

  const { productionStatusesData, isProductionStatusesLoading } =
    useGetProductionStatuses("scenarioChapter");

  const { updateScenarioChapter, isUpdateScenarioChapterPending } =
    useUpdateScenarioChapter();

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

      updateScenarioChapter(
        {
          chapterId,
          data: { productionStatusId: newProductionStatusId },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getApiV1ScenariosChaptersByChapterIdQueryKey({
                chapterId,
              }),
            });
          },
          onError: () => {
            setActiveProductionStatusId(previousProductionStatusId);

            showErrorToast({
              description:
                "Произошла ошибка при обновлении статуса раздела сценария",
            });
          },
        },
      );
    },
    [
      chapterId,
      queryClient,
      activeProductionStatusId,
      updateScenarioChapter,
      showErrorToast,
    ],
  );

  useEffect(() => {
    if (scenarioChapterData?.data) {
      setActiveProductionStatusId(scenarioChapterData.data.productionStatusId);
    }
  }, [scenarioChapterData]);

  return {
    productionStatuses,
    activeProductionStatus,
    isLoading: isScenarioChapterLoading || isProductionStatusesLoading,
    isUpdatePending: isUpdateScenarioChapterPending,
    handleSelectStatus,
  };
}
