import { useMutation } from "@tanstack/react-query";

import { deleteApiV1ProfilesProfileIdMutation } from "@/codegen/api/product/@tanstack/react-query.gen";
import { useToast } from "@/shared/hooks/use-toast";

type UseDeleteProfileParams = {
  onSuccess?: () => void;
};

export function useDeleteProfile(params?: UseDeleteProfileParams) {
  const { onSuccess } = params ?? {};
  const { showErrorToast, showSuccessToast } = useToast();

  const { mutate: deleteProfile, isPending: isDeleteProfilePending } =
    useMutation({
      ...deleteApiV1ProfilesProfileIdMutation(),
      onError: () => {
        showErrorToast({
          title: "Ошибка",
          description: "Не удалось удалить профиль",
        });
      },
      onSuccess: ({ data }) => {
        showSuccessToast({
          title: "Профиль удален",
          description: `Профиль "${data.name}" был успешно удален`,
        });
        onSuccess?.();
      },
    });

  return {
    deleteProfile,
    isDeleteProfilePending,
  };
}
