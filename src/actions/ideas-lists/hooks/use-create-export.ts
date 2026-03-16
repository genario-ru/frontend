import { usePostApiV1IdeasListsByIdeasListIdExport } from "@/codegen/api/product";

export function useCreateExport() {
  const { mutate: createExport, isPending: isCreateExportPending } =
    usePostApiV1IdeasListsByIdeasListIdExport();

  return {
    createExport,
    isCreateExportPending,
  };
}
