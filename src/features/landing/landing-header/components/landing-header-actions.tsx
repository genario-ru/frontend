import { ButtonLink } from "@/shared/components/ui/button-link";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { NBSP, RUBLE_SIGN } from "@/shared/constants/unicode";

export function LandingHeaderActions() {
  const { isMobile } = useBreakpoints();

  return (
    <div className="flex items-center gap-2 duration-200">
      <ButtonLink priority="tertiary" to="/sign-in">
        Войти
      </ButtonLink>
      <ButtonLink to="/" hash="tariffs">
        {isMobile ? (
          "3 дня за 1 ₽"
        ) : (
          <>
            Попробовать 3 дня за 1{NBSP}
            {RUBLE_SIGN}
          </>
        )}
      </ButtonLink>
    </div>
  );
}
