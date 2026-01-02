import { AuthIsland } from "@/features/auth/components/auth-island";
import { FormHeader } from "@/features/auth/components/form-header";
import { PoliciesAgreement } from "@/features/auth/components/policies-agreement";
import { SignInForm } from "@/widgets/auth/components/sign-in-form";

export const SignInComponent = () => {
  return (
    <AuthIsland>
      <FormHeader
        title="Добро пожаловать!"
        description={`Для входа / регистрации введите ваш\nадрес электронной почты`}
      />
      <SignInForm />
      <PoliciesAgreement />
    </AuthIsland>
  );
};
