import { usePatchApiV1IdeasListsByIdeasListId } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useUpdateIdeasList() {
  const { showErrorToast } = useToast();

  const { mutate: updateIdeasList, isPending: isUpdateIdeasListPending } =
    usePatchApiV1IdeasListsByIdeasListId({
      mutation: {
        onError: () => {
          showErrorToast({
            title: "Произошла ошибка при обновлении списка идей",
            description: "Попробуйте еще раз немного позже",
          });
        },
      },
    });

  return {
    updateIdeasList,
    isUpdateIdeasListPending,
  };
}
