import { ButtonLink } from "@/shared/components/ui/button-link";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

export function LegalDocumentsHeaderActions() {
  const { isMobile } = useBreakpoints();

  return (
    <div className="flex items-center gap-2 duration-200">
      <ButtonLink priority="tertiary" to="/sign-in">
        Войти
      </ButtonLink>
      <ButtonLink to="/sign-in">
        {isMobile ? "Начать" : "Попробовать бесплатно"}
      </ButtonLink>
    </div>
  );
}
