import { useCallback, useEffect, useState } from "react";

import { useCreateExport } from "@/actions/ideas-lists/hooks/use-create-export";
import { useGetExports } from "@/actions/ideas-lists/hooks/use-get-exports";
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
  const [exportJob, setExportJob] = useState<ExportJob | null>(null);
  const { showErrorToast } = useToast();
  const { createExport, isCreateExportPending } = useCreateExport();

  const { exportsData, isGetExportsLoading } = useGetExports({
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

      const exportData = exportsData?.data.find(
        (exportData) => exportData.formatSlug === format,
      );

      if (exportData?.documentStatus === "ready" && exportData.documentUrl) {
        handleDownloadIdeasList(exportData.documentUrl);
        return;
      }

      createExport(
        { ideasListId, data: { format } },
        {
          onSuccess: ({ data }) => {
            if (data.documentUrl) {
              handleDownloadIdeasList(data.documentUrl);
            } else if (data.documentStatus === "failed") {
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
      exportJob,
      exportsData,
      createExport,
      handleDownloadIdeasList,
      handleDownloadIdeasListError,
    ],
  );

  useEffect(() => {
    if (!exportJob || !exportsData) {
      return;
    }

    const exportData = exportsData.data.find(
      (exportData) => exportData.formatSlug === exportJob.format,
    );

    if (exportData?.documentStatus === "ready" && exportData.documentUrl) {
      handleDownloadIdeasList(exportData.documentUrl);
    } else if (exportData?.documentStatus === "failed") {
      handleDownloadIdeasListError();
    }
  }, [
    exportJob,
    exportsData,
    handleDownloadIdeasList,
    handleDownloadIdeasListError,
  ]);

  return {
    exportJob,
    exportsData,
    isCreateExportPending,
    isGetExportsLoading,
    handleCreateExport,
  };
}
