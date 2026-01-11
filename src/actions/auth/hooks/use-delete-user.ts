import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { postDeleteUserMutation } from "@/codegen/api/auth/@tanstack/react-query.gen";
import { useToast } from "@/shared/hooks/use-toast";

export function useDeleteUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const { mutate: deleteUser, isPending: isDeleteUserPending } = useMutation({
    ...postDeleteUserMutation(),
    onSuccess: () => {
      queryClient.clear();

      navigate({
        to: "/sign-in",
        replace: true,
        reloadDocument: true,
      });
    },
    onError: () => {
      showErrorToast({
        description:
          "Произошла ошибка при удалении вашего аккаунта. Проверьте корректность ввденного пароля и попробуйте еще раз",
      });
    },
  });

  return {
    deleteUser,
    isDeleteUserPending,
  };
}
