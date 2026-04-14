import { usePatchApiV1ScenariosByScenarioId } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useUpdateScenario() {
  const { showErrorToast } = useToast();

  const { mutate: updateScenario, isPending: isUpdateScenarioPending } =
    usePatchApiV1ScenariosByScenarioId({
      mutation: {
        onError: () => {
          showErrorToast({
            title: "Произошла ошибка при обновлении сценария",
            description: "Попробуйте еще раз немного позже",
          });
        },
      },
    });

  return {
    updateScenario,
    isUpdateScenarioPending,
  };
}
