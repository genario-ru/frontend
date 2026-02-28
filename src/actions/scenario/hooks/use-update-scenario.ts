import {
  type PatchApiV1ScenariosScenarioIdMutationResponse,
  usePatchApiV1ScenariosScenarioId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateScenarioParams = {
  onSuccess?: (data: PatchApiV1ScenariosScenarioIdMutationResponse) => void;
  onError?: () => void;
};

export function useUpdateScenario(params?: UseUpdateScenarioParams) {
  const { onSuccess, onError } = params ?? {};
  const { showErrorToast } = useToast();

  const { mutate: updateScenario, isPending: isUpdateScenarioPending } =
    usePatchApiV1ScenariosScenarioId({
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
