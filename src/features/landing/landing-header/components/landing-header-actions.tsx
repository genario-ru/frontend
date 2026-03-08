import { ButtonLink } from "@/shared/components/ui/button-link";

export function LandingHeaderActions() {
  return (
    <div className="flex items-center gap-2 duration-200">
      <ButtonLink priority="tertiary" to="/sign-in">
        Войти
      </ButtonLink>
      <ButtonLink to="/sign-in">Попробовать бесплатно</ButtonLink>
    </div>
  );
}
