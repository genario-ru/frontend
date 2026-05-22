import { ButtonLink } from "@/shared/components/ui/button-link";
import { NBSP, RUBLE_SIGN } from "@/shared/constants/unicode";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

export function CreditsPackagesHeaderActions() {
  const { isMobile } = useBreakpoints();

  const tryButtonContent = isMobile
    ? "3 дня за 1 ₽"
    : `Попробовать 3 дня за 1${NBSP}${RUBLE_SIGN}`;

  return (
    <div className="flex items-center gap-2 duration-200">
      <ButtonLink priority="tertiary" to="/sign-in">
        Войти
      </ButtonLink>
      <ButtonLink to="/" hash="tariffs">
        {tryButtonContent}
      </ButtonLink>
    </div>
  );
}
