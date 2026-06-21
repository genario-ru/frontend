import { ButtonLink } from "@/shared/components/ui/button-link";

export function WaitlistLandingHeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <ButtonLink
        variant="accent"
        priority="primary"
        to="/waitlist"
        hash="waitlist-form"
      >
        Оставить заявку
      </ButtonLink>
    </div>
  );
}
