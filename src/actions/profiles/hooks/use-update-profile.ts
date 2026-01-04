import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ProfilesMyQueryKey,
  getApiV1ProfilesProfileIdQueryKey,
  patchApiV1ProfilesProfileIdMutation,
} from "@/codegen/api/product/@tanstack/react-query.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateProfileParams = {
  onSuccess?: () => void;
};

export function useUpdateProfile(params?: UseUpdateProfileParams) {
  const { onSuccess } = params ?? {};
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToast();

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useMutation({
      ...patchApiV1ProfilesProfileIdMutation(),
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({
          queryKey: getApiV1ProfilesMyQueryKey(),
        });

        queryClient.invalidateQueries({
          queryKey: getApiV1ProfilesProfileIdQueryKey({
            path: { profileId: data.id },
          }),
        });

        showSuccessToast({
          title: "Профиль обновлен",
          description: `Профиль "${data.name}" успешно обновлен`,
        });

        onSuccess?.();
      },
      onError: () => {
        showErrorToast({
          description: `Произошла ошибка при обновлении профиля. Попробуйте еще раз немного позже`,
        });
      },
    });

  return { updateProfile, isUpdateProfilePending };
}
