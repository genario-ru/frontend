import { AuthIsland } from "@/features/auth/components/auth-island";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Plug } from "@/shared/components/ui/plug";

export function VerifyOTPErrorComponent() {
  return (
    <AuthIsland>
      <Plug
        size="lg"
        variant="negative"
        title="Ошибка подтверждения"
        description="Не удалось открыть форму подтверждения, потому что не указан email. Вернитесь на предыдущий шаг и запросите код повторно."
        actions={
          <ButtonLink to="/sign-in" size="lg" className="mt-2">
            Вернуться ко входу
          </ButtonLink>
        }
      />
    </AuthIsland>
  );
}
