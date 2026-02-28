import { usePostChangeEmail } from "@/codegen/api/auth";
import { useToast } from "@/shared/hooks/use-toast";

type UseChangeEmailProps = {
  onSuccess?: () => void;
};

export function useChangeEmail(params?: UseChangeEmailProps) {
  const { onSuccess } = params ?? {};
  const { showErrorToast } = useToast();

  const { mutateAsync: changeEmailAsync } = usePostChangeEmail({
    mutation: {
      onError: () => {
        showErrorToast({
          description:
            "Произошла ошибка во время отправки письма для подтверждения смены Email",
        });
      },
      onSuccess: () => {
        onSuccess?.();
      },
    },
  });

  return { changeEmailAsync };
}
