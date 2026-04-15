import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { useCreateScenarioExport } from "@/actions/scenario/hooks/use-create-scenario-export";
import { useGetScenarioExports } from "@/actions/scenario/hooks/use-get-scenario-exports";
import { getApiV1ScenariosByScenarioIdExportsQueryKey } from "@/codegen/api/product";
import type { GetApiV1ScenariosByScenarioIdExportsQueryResponse } from "@/codegen/api/product/models";
import { useToast } from "@/shared/hooks/use-toast";
import { downloadFileByUrl } from "@/shared/utils/download-file-by-url";

const WAITING_FOR_EXPORT_REFRESH_INTERVAL = 1000;

type UseScenarioAppMenubarExportSubmenuParams = {
  scenarioId: string;
  scenarioVersionId: string;
  handleDropdownMenuClose: () => void;
};

type ExportJob = {
  format: string;
};

export function useScenarioAppMenubarExportSubmenu({
  scenarioId,
  scenarioVersionId,
  handleDropdownMenuClose,
}: UseScenarioAppMenubarExportSubmenuParams) {
  const queryClient = useQueryClient();
  const [exportJob, setExportJob] = useState<ExportJob | null>(null);
  const { showErrorToast } = useToast();

  const { createScenarioExport, isCreateScenarioExportPending } =
    useCreateScenarioExport();

  const { scenarioVersionExportsData, isGetScenarioVersionExportsLoading } =
    useGetScenarioExports({
      scenarioId,
      versionId: scenarioVersionId,
      refetchInterval: exportJob
        ? WAITING_FOR_EXPORT_REFRESH_INTERVAL
        : undefined,
    });

  const handleDownloadScenarioVersionError = useCallback(() => {
    showErrorToast({
      description:
        "Произошла ошибка при экспорте сценария. Попробуйте еще раз немного позже",
    });

    setExportJob(null);
  }, [showErrorToast]);

  const handleDownloadScenarioVersion = useCallback(
    (documentUrl: string) => {
      setExportJob(null);
      downloadFileByUrl({ url: documentUrl });
      handleDropdownMenuClose();
    },
    [handleDropdownMenuClose],
  );

  const handleCreateExport = useCallback(
    (format: string) => {
      if (exportJob) {
        return;
      }

      const exportData = scenarioVersionExportsData?.data.find(
        (exportData) => exportData.formatSlug === format,
      );

      if (exportData?.documentStatus === "ready" && exportData.documentUrl) {
        handleDownloadScenarioVersion(exportData.documentUrl);
        return;
      }

      createScenarioExport(
        { scenarioId, params: { versionId: scenarioVersionId, format } },
        {
          onSuccess: ({ data: mutationData }) => {
            queryClient.setQueryData(
              getApiV1ScenariosByScenarioIdExportsQueryKey(
                { scenarioId },
                { versionId: scenarioVersionId },
              ),
              (oldData: GetApiV1ScenariosByScenarioIdExportsQueryResponse) => {
                return {
                  ...oldData,
                  data: oldData.data.map((exportData) => {
                    if (exportData.formatSlug === format) {
                      return mutationData;
                    }

                    return exportData;
                  }),
                };
              },
            );

            if (mutationData.documentUrl) {
              handleDownloadScenarioVersion(mutationData.documentUrl);
            } else if (mutationData.documentStatus === "failed") {
              handleDownloadScenarioVersionError();
            } else {
              setExportJob({ format });
            }
          },
          onError: () => {
            handleDownloadScenarioVersionError();
          },
        },
      );
    },
    [
      scenarioId,
      scenarioVersionId,
      queryClient,
      exportJob,
      scenarioVersionExportsData,
      createScenarioExport,
      handleDownloadScenarioVersion,
      handleDownloadScenarioVersionError,
    ],
  );

  useEffect(() => {
    if (!exportJob || !scenarioVersionExportsData) {
      return;
    }

    const exportData = scenarioVersionExportsData.data.find(
      (exportData) => exportData.formatSlug === exportJob.format,
    );

    if (exportData?.documentStatus === "ready" && exportData.documentUrl) {
      handleDownloadScenarioVersion(exportData.documentUrl);
    } else if (exportData?.documentStatus === "failed") {
      handleDownloadScenarioVersionError();
    }
  }, [
    exportJob,
    scenarioVersionExportsData,
    handleDownloadScenarioVersion,
    handleDownloadScenarioVersionError,
  ]);

  return {
    exportJob,
    exportsData: scenarioVersionExportsData,
    isCreateExportPending: isCreateScenarioExportPending,
    isGetExportsLoading: isGetScenarioVersionExportsLoading,
    handleCreateExport,
  };
}
