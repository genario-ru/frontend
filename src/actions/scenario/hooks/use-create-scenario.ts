import { usePostApiV1Scenarios } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useCreateScenario() {
  const { showErrorToast } = useToast();

  const { mutate: createScenario, isPending: isCreateScenarioPending } =
    usePostApiV1Scenarios({
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
    createScenario,
    isCreateScenarioPending,
  };
}
