import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { useCreateIdeasListExport } from "@/actions/ideas-lists/hooks/use-create-ideas-list-export";
import { useGetIdeasListExports } from "@/actions/ideas-lists/hooks/use-get-ideas-list-exports";
import type { GetApiV1IdeasListsByIdeasListIdExportsQueryResponse } from "@/codegen/api/product/models";
import { getApiV1IdeasListsByIdeasListIdExportsQueryKey } from "@/codegen/api/product/tanstack/get-api-v1-ideas-lists-by-ideas-list-id-exports";
import { useToast } from "@/shared/hooks/use-toast";
import { downloadFileByUrl } from "@/shared/utils/download-file-by-url";

const WAITING_FOR_EXPORT_REFRESH_INTERVAL = 1000;

type UseIdeasListAppMenubarExportSubmenuParams = {
  ideasListId: string;
  handleDropdownMenuClose: () => void;
};

type ExportJob = {
  format: string;
};

export function useIdeasListAppMenubarExportSubmenu({
  ideasListId,
  handleDropdownMenuClose,
}: UseIdeasListAppMenubarExportSubmenuParams) {
  const queryClient = useQueryClient();
  const [exportJob, setExportJob] = useState<ExportJob | null>(null);
  const { showErrorToast } = useToast();
  const { createIdeasListExport, isCreateIdeasListExportPending } =
    useCreateIdeasListExport();

  const { ideasListExportsData, isGetIdeasListExportsLoading } =
    useGetIdeasListExports({
      ideasListId,
      refetchInterval: exportJob
        ? WAITING_FOR_EXPORT_REFRESH_INTERVAL
        : undefined,
    });

  const handleDownloadIdeasListError = useCallback(() => {
    showErrorToast({
      description:
        "Произошла ошибка при экспорте списка идей. Попробуйте еще раз немного позже",
    });

    setExportJob(null);
  }, [showErrorToast]);

  const handleDownloadIdeasList = useCallback(
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

      const exportData = ideasListExportsData?.data.find(
        (exportData) => exportData.formatSlug === format,
      );

      if (exportData?.documentStatus === "ready" && exportData.documentUrl) {
        handleDownloadIdeasList(exportData.documentUrl);
        return;
      }

      createIdeasListExport(
        { ideasListId, data: { format } },
        {
          onSuccess: ({ data: mutationData }) => {
            queryClient.setQueryData(
              getApiV1IdeasListsByIdeasListIdExportsQueryKey({ ideasListId }),
              (
                oldData: GetApiV1IdeasListsByIdeasListIdExportsQueryResponse,
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
              handleDownloadIdeasList(mutationData.documentUrl);
            } else if (mutationData.documentStatus === "failed") {
              handleDownloadIdeasListError();
            } else {
              setExportJob({ format });
            }
          },
          onError: () => {
            handleDownloadIdeasListError();
          },
        },
      );
    },
    [
      ideasListId,
      queryClient,
      exportJob,
      ideasListExportsData,
      createIdeasListExport,
      handleDownloadIdeasList,
      handleDownloadIdeasListError,
    ],
  );

  useEffect(() => {
    if (!exportJob || !ideasListExportsData) {
      return;
    }

    const exportData = ideasListExportsData.data.find(
      (exportData) => exportData.formatSlug === exportJob.format,
    );

    if (exportData?.documentStatus === "ready" && exportData.documentUrl) {
      handleDownloadIdeasList(exportData.documentUrl);
    } else if (exportData?.documentStatus === "failed") {
      handleDownloadIdeasListError();
    }
  }, [
    exportJob,
    ideasListExportsData,
    handleDownloadIdeasList,
    handleDownloadIdeasListError,
  ]);

  return {
    exportJob,
    exportsData: ideasListExportsData,
    isCreateExportPending: isCreateIdeasListExportPending,
    isGetExportsLoading: isGetIdeasListExportsLoading,
    handleCreateExport,
  };
}
