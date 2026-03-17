import { usePostApiV1IdeasListsByIdeasListIdExport } from "@/codegen/api/product";

export function useCreateIdeasListExport() {
  const {
    mutate: createIdeasListExport,
    isPending: isCreateIdeasListExportPending,
  } = usePostApiV1IdeasListsByIdeasListIdExport();

  return {
    createIdeasListExport,
    isCreateIdeasListExportPending,
  };
}
