import { useMutation } from "@tanstack/react-query";

import { postApiV1ScenariosMutation } from "@/codegen/api/product/@tanstack/react-query.gen";
import type { PostApiV1ScenariosResponse } from "@/codegen/api/product/types.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseCreateScenarioParams = {
  onSuccess?: (data: PostApiV1ScenariosResponse) => void;
  onError?: () => void;
};

export function useCreateScenario(params?: UseCreateScenarioParams) {
  const { showErrorToast } = useToast();
  const { onSuccess, onError } = params ?? {};

  const { mutate: createScenario, isPending: isCreateScenarioPending } =
    useMutation({
      ...postApiV1ScenariosMutation(),
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
    });

  return {
    createScenario,
    isCreateScenarioPending,
  };
}
