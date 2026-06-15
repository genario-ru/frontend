import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { usePostApiV1AuthUserDelete } from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";
import { useToast } from "@/shared/hooks/use-toast";

export function useDeleteUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const reachGoal = useReachGoal();
  const { showErrorToast } = useToast();

  const { mutate: deleteUser, isPending: isDeleteUserPending } =
    usePostApiV1AuthUserDelete({
      mutation: {
        onSuccess: () => {
          reachGoal("account-delete-success");
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
      },
    });

  return {
    deleteUser,
    isDeleteUserPending,
  };
}
