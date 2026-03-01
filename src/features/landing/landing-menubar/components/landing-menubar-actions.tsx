import { ButtonLink } from "@/shared/components/ui/button-link";
import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

type LandingMenubarActionsProps = {
  withShadow?: boolean;
};

export function LandingMenubarActions({
  withShadow,
}: LandingMenubarActionsProps) {
  return (
    <Island
      row
      roundedTop={false}
      className={cn("w-fit duration-200", {
        "shadow-bottom-1": withShadow,
      })}
    >
      <ButtonLink priority="tertiary" to="/sign-in">
        Войти
      </ButtonLink>
      <ButtonLink to="/sign-in">Попробовать бесплатно</ButtonLink>
    </Island>
  );
}
