import { usePostSendVerificationEmail } from "@/codegen/api/auth";
import { useToast } from "@/shared/hooks/use-toast";

type UseSendVerificationEmailParams = {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

export function useSendVerificationEmail(
  params?: UseSendVerificationEmailParams,
) {
  const { onMutate, onSuccess, onError } = params ?? {};
  const { showErrorToast } = useToast();

  const {
    mutate: sendVerificationEmail,
    isPending: isVerificationEmailSending,
    isSuccess: isVerificationEmailSent,
  } = usePostSendVerificationEmail({
    mutation: {
      onMutate: () => {
        onMutate?.();
      },
      onSuccess: () => {
        onSuccess?.();
      },
      onError: () => {
        showErrorToast({
          description:
            "Произошла ошибка при отправке письма для подтверждения Email. Попробуйте немного позже",
        });

        onError?.();
      },
    },
  });

  return {
    sendVerificationEmail,
    isVerificationEmailSending,
    isVerificationEmailSent,
  };
}
