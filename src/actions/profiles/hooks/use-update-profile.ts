import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ProfilesMyQueryKey,
  getApiV1ProfilesProfileIdQueryKey,
  usePatchApiV1ProfilesProfileId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseUpdateProfileParams = {
  onSuccess?: () => void;
};

export function useUpdateProfile(params?: UseUpdateProfileParams) {
  const { onSuccess } = params ?? {};
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToast();

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    usePatchApiV1ProfilesProfileId({
      mutation: {
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries({
            queryKey: getApiV1ProfilesMyQueryKey(),
          });

          queryClient.invalidateQueries({
            queryKey: getApiV1ProfilesProfileIdQueryKey({
              profileId: data.id,
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
      },
    });

  return { updateProfile, isUpdateProfilePending };
}
