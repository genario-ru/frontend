import {
  type PostApiV1ScenariosMutationResponse,
  usePostApiV1Scenarios,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseCreateScenarioParams = {
  onSuccess?: (data: PostApiV1ScenariosMutationResponse) => void;
  onError?: () => void;
};

export function useCreateScenario(params?: UseCreateScenarioParams) {
  const { showErrorToast } = useToast();
  const { onSuccess, onError } = params ?? {};

  const { mutate: createScenario, isPending: isCreateScenarioPending } =
    usePostApiV1Scenarios({
      mutation: {
        onSuccess: (data) => {
          onSuccess?.(data);
        },
        onError: () => {
          showErrorToast({
            title: "Произошла ошибка при создании сценария",
            description: "Попробуйте еще раз немного позже",
          });

          onError?.();
        },
      },
    });

  return {
    createScenario,
    isCreateScenarioPending,
  };
}
