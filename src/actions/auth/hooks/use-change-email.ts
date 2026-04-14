import { usePostChangeEmail } from "@/codegen/api/auth";
import { useToast } from "@/shared/hooks/use-toast";

export function useChangeEmail() {
  const { showErrorToast } = useToast();

  const { mutateAsync: changeEmailAsync } = usePostChangeEmail({
    mutation: {
      onError: () => {
        showErrorToast({
          description:
            "Произошла ошибка во время отправки письма для подтверждения смены Email",
        });
      },
    },
  });

  return { changeEmailAsync };
}
