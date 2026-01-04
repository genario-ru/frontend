import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ProfilesMyQueryKey,
  postApiV1ProfilesMutation,
} from "@/codegen/api/product/@tanstack/react-query.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseCreateProfileParams = {
  onSuccess?: () => void;
};

export function useCreateProfile(params?: UseCreateProfileParams) {
  const { onSuccess } = params ?? {};
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToast();

  const { mutate: createProfile, isPending: isCreateProfilePending } =
    useMutation({
      ...postApiV1ProfilesMutation(),
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: getApiV1ProfilesMyQueryKey(),
        });

        showSuccessToast({
          title: "Профиль создан",
          description: `Профиль "${data.name}" успешно создан`,
        });

        onSuccess?.();
      },
      onError: () => {
        showErrorToast({
          description: `Произошла ошибка при создании профиля. Попробуйте еще раз немного позже`,
        });
      },
    });

  return { createProfile, isCreateProfilePending };
}
