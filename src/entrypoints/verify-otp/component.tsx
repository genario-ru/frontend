import { useSearch } from "@tanstack/react-router";

import { AuthIsland } from "@/features/auth/components/auth-island";
import { FormHeader } from "@/features/auth/components/form-header";
import { VerifyOTPForm } from "@/widgets/auth/components/verify-otp-form";

export function VerifyOTPComponent() {
  const { email } = useSearch({ from: "/_auth/verify-otp" });

  return (
    <AuthIsland>
      <FormHeader
        title="Подтверждение почты"
        description={
          <>
            Пожалуйста, введите код, отправленный на почту{"\n"}
            <span className="text-new-neutral-8 text-base font-medium">
              {email}
            </span>
          </>
        }
      />
      <VerifyOTPForm email={email} />
    </AuthIsland>
  );
}
