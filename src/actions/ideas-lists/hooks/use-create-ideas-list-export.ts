import { usePostApiV1IdeasListsByIdeasListIdExport } from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";

export function useCreateIdeasListExport() {
  const reachGoal = useReachGoal();

  const {
    mutate: createIdeasListExport,
    isPending: isCreateIdeasListExportPending,
  } = usePostApiV1IdeasListsByIdeasListIdExport({
    mutation: {
      onSuccess: () => reachGoal("ideas-list-export-request"),
    },
  });

  return {
    createIdeasListExport,
    isCreateIdeasListExportPending,
  };
}
