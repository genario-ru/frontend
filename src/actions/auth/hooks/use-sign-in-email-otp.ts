import { usePostApiV1AuthEmailOtpSignIn } from "@/codegen/api/product";
import { useReachGoal } from "@/lib/yandex-metrika";

export function useSignInEmailOtp() {
  const reachGoal = useReachGoal();

  const {
    mutate: signIn,
    isPending: isSignInPending,
    isSuccess: isSignInSuccess,
  } = usePostApiV1AuthEmailOtpSignIn({
    mutation: {
      onSuccess: () => reachGoal("sign-in-success"),
    },
  });

  return {
    signIn,
    isSignInPending,
    isSignInSuccess,
  };
}
