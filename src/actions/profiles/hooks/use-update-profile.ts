import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ProfilesByProfileIdQueryKey,
  getApiV1ProfilesMyQueryKey,
  usePatchApiV1ProfilesByProfileId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useToast();

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    usePatchApiV1ProfilesByProfileId({
      mutation: {
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries({
            queryKey: getApiV1ProfilesMyQueryKey(),
          });

          queryClient.invalidateQueries({
            queryKey: getApiV1ProfilesByProfileIdQueryKey({
              profileId: data.id,
            }),
          });

          showSuccessToast({
            title: "Профиль обновлен",
            description: `Профиль "${data.name}" успешно обновлен`,
          });
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
