import { useMutation } from "@tanstack/react-query";

import { postUpdateUserMutation } from "@/codegen/api/auth/@tanstack/react-query.gen";
import { useToast } from "@/shared/hooks/use-toast";

export function useUpdateUser() {
  const { showErrorToast, showSuccessToast } = useToast();

  const {
    mutate: updateUser,
    mutateAsync: updateUserAsync,
    isPending: isUpdateUserPending,
  } = useMutation({
    ...postUpdateUserMutation(),
    onSuccess: () => {
      showSuccessToast({
        title: "Все получилось",
        description: "Ваши данные были успешно обновлены",
      });
    },
    onError: () => {
      showErrorToast({
        description: "Произошла ошибка во время обновления данных",
      });
    },
  });

  return { updateUser, updateUserAsync, isUpdateUserPending };
}
