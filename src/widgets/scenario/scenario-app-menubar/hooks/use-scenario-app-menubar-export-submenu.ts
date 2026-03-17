import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { useCreateScenarioVersionExport } from "@/actions/scenario/hooks/use-create-scenario-version-export";
import { useGetScenarioVersionExports } from "@/actions/scenario/hooks/use-get-scenario-version-exports";
import { getApiV1ScenariosVersionsByVersionIdExportsQueryKey } from "@/codegen/api/product";
import type { GetApiV1ScenariosVersionsByVersionIdExportsQueryResponse } from "@/codegen/api/product/models";
import { useToast } from "@/shared/hooks/use-toast";
import { downloadFileByUrl } from "@/shared/utils/download-file-by-url";

const WAITING_FOR_EXPORT_REFRESH_INTERVAL = 1000;

type UseScenarioAppMenubarExportSubmenuParams = {
  scenarioVersionId: string;
  handleDropdownMenuClose: () => void;
};

type ExportJob = {
  format: string;
};

export function useScenarioAppMenubarExportSubmenu({
  scenarioVersionId,
  handleDropdownMenuClose,
}: UseScenarioAppMenubarExportSubmenuParams) {
  const queryClient = useQueryClient();
  const [exportJob, setExportJob] = useState<ExportJob | null>(null);
  const { showErrorToast } = useToast();
  const { createScenarioVersionExport, isCreateScenarioVersionExportPending } =
    useCreateScenarioVersionExport();

  const { scenarioVersionExportsData, isGetScenarioVersionExportsLoading } =
    useGetScenarioVersionExports({
      scenarioVersionId,
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

      createScenarioVersionExport(
        { versionId: scenarioVersionId, data: { format } },
        {
          onSuccess: ({ data: mutationData }) => {
            queryClient.setQueryData(
              getApiV1ScenariosVersionsByVersionIdExportsQueryKey({
                versionId: scenarioVersionId,
              }),
              (
                oldData: GetApiV1ScenariosVersionsByVersionIdExportsQueryResponse,
              ) => {
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
      scenarioVersionId,
      queryClient,
      exportJob,
      scenarioVersionExportsData,
      createScenarioVersionExport,
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
    isCreateExportPending: isCreateScenarioVersionExportPending,
    isGetExportsLoading: isGetScenarioVersionExportsLoading,
    handleCreateExport,
  };
}
