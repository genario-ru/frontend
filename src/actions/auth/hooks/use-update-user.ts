import { usePostUpdateUser } from "@/codegen/api/auth";
import { useToast } from "@/shared/hooks/use-toast";

export function useUpdateUser() {
  const { showErrorToast, showSuccessToast } = useToast();

  const {
    mutate: updateUser,
    mutateAsync: updateUserAsync,
    isPending: isUpdateUserPending,
  } = usePostUpdateUser({
    mutation: {
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
    },
  });

  return { updateUser, updateUserAsync, isUpdateUserPending };
}
