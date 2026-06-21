import { ButtonLink } from "@/shared/components/ui/button-link";

export function WaitlistLandingHeroActions() {
  return (
    <div className="flex w-full flex-col items-stretch gap-2 md:w-auto md:flex-row md:items-center">
      <ButtonLink
        size="lg"
        variant="accent"
        priority="primary"
        to="/waitlist"
        hash="waitlist-form"
        className="w-full md:w-auto"
      >
        Оставить заявку
      </ButtonLink>
    </div>
  );
}
