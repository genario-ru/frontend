import { useQueryClient } from "@tanstack/react-query";

import {
  getApiV1OnboardingQueryKey,
  getApiV1ProfilesMyQueryKey,
  usePostApiV1Profiles,
} from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";
import { useToast } from "@/shared/hooks/use-toast";

export function useCreateProfile() {
  const queryClient = useQueryClient();
  const reachGoal = useReachGoal();
  const { showSuccessToast, showErrorToast } = useToast();

  const { mutate: createProfile, isPending: isCreateProfilePending } =
    usePostApiV1Profiles({
      mutation: {
        onSuccess: ({ data }) => {
          reachGoal("profile-create-success");

          queryClient.invalidateQueries({
            queryKey: getApiV1ProfilesMyQueryKey(),
          });

          queryClient.invalidateQueries({
            queryKey: getApiV1OnboardingQueryKey(),
          });

          showSuccessToast({
            title: "Профиль создан",
            description: `Профиль "${data.name}" успешно создан`,
          });
        },
        onError: () => {
          showErrorToast({
            description: `Произошла ошибка при создании профиля. Попробуйте еще раз немного позже`,
          });
        },
      },
    });

  return { createProfile, isCreateProfilePending };
}
