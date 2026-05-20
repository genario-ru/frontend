import { useSearch } from "@tanstack/react-router";

import { AuthIsland } from "@/features/auth/components/auth-island";
import { FormHeader } from "@/features/auth/components/form-header";
import { SignInForm } from "@/widgets/auth/components/sign-in-form";

export function SignInComponent() {
  const { email, redirect } = useSearch({
    from: "/_auth/sign-in",
  });

  return (
    <AuthIsland>
      <FormHeader
        title="Добро пожаловать!"
        description={`Для входа / регистрации введите ваш\nадрес электронной почты`}
      />
      <SignInForm email={email} redirect={redirect} />
    </AuthIsland>
  );
}
