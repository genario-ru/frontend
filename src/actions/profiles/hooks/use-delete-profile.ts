import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1OnboardingQueryKey,
  getApiV1ProfilesMyQueryKey,
  useDeleteApiV1ProfilesByProfileId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useDeleteProfile() {
  const queryClient = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutate: deleteProfile, isPending: isDeleteProfilePending } =
    useDeleteApiV1ProfilesByProfileId({
      mutation: {
        onError: () => {
          showErrorToast({
            title: "Ошибка",
            description: "Не удалось удалить профиль",
          });
        },
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries({
            queryKey: getApiV1ProfilesMyQueryKey(),
          });

          queryClient.invalidateQueries({
            queryKey: getApiV1OnboardingQueryKey(),
          });

          showSuccessToast({
            title: "Профиль удален",
            description: `Профиль "${data.name}" был успешно удален`,
          });
        },
      },
    });

  return {
    deleteProfile,
    isDeleteProfilePending,
  };
}
