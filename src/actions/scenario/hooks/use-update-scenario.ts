import {
  type PatchApiV1ScenariosByScenarioIdMutationResponse,
  usePatchApiV1ScenariosByScenarioId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateScenarioParams = {
  onSuccess?: (data: PatchApiV1ScenariosByScenarioIdMutationResponse) => void;
  onError?: () => void;
};

export function useUpdateScenario(params?: UseUpdateScenarioParams) {
  const { onSuccess, onError } = params ?? {};
  const { showErrorToast } = useToast();

  const { mutate: updateScenario, isPending: isUpdateScenarioPending } =
    usePatchApiV1ScenariosByScenarioId({
      mutation: {
        onSuccess: (data) => {
          onSuccess?.(data);
        },
        onError: () => {
          showErrorToast({
            title: "Произошла ошибка при обновлении сценария",
            description: "Попробуйте еще раз немного позже",
          });

          onError?.();
        },
      },
    });

  return {
    updateScenario,
    isUpdateScenarioPending,
  };
}
