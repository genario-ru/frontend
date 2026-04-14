import { usePostApiV1IdeasLists } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useCreateIdeasList() {
  const { showErrorToast } = useToast();

  const { mutate: createIdeasList, isPending: isCreateIdeasListPending } =
    usePostApiV1IdeasLists({
      mutation: {
        onError: () => {
          showErrorToast({
            title: "Произошла ошибка при создании сценария",
            description: "Попробуйте еще раз немного позже",
          });
        },
      },
    });

  return {
    createIdeasList,
    isCreateIdeasListPending,
  };
}
