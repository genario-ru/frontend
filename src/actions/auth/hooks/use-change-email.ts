import { usePostApiV1AuthChangeEmail } from "@/codegen/api/product";
import { useToast } from "@/shared/hooks/use-toast";

export function useChangeEmail() {
  const { showErrorToast } = useToast();

  const { mutateAsync: changeEmailAsync } = usePostApiV1AuthChangeEmail({
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
