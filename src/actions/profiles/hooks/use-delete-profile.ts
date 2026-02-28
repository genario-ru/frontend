import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1ProfilesMyQueryKey,
  useDeleteApiV1ProfilesProfileId,
} from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

type UseDeleteProfileParams = {
  onSuccess?: () => void;
};

export function useDeleteProfile(params?: UseDeleteProfileParams) {
  const queryClient = useQueryClient();
  const { onSuccess } = params ?? {};
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutate: deleteProfile, isPending: isDeleteProfilePending } =
    useDeleteApiV1ProfilesProfileId({
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

          showSuccessToast({
            title: "Профиль удален",
            description: `Профиль "${data.name}" был успешно удален`,
          });

          onSuccess?.();
        },
      },
    });

  return {
    deleteProfile,
    isDeleteProfilePending,
  };
}
