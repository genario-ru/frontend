import { ArrowRightIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";

export function WaitlistLandingHeroActions() {
  return (
    <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
      <ButtonLink
        size="lg"
        variant="accent"
        priority="primary"
        to="/"
        hash="waitlist-form"
        icon={<ArrowRightIcon />}
        className="w-full sm:w-auto"
      >
        Оставить заявку
      </ButtonLink>
      <ButtonLink
        size="lg"
        variant="neutral"
        priority="tertiary"
        to="/"
        hash="possibilities"
        className="bg-neutral-1/10 text-neutral-1 hover:bg-neutral-1/15 active:bg-neutral-1/15 dark:bg-neutral-8/10 dark:text-neutral-8 dark:hover:bg-neutral-8/15 dark:active:bg-neutral-8/15 [&_svg]:stroke-neutral-1 dark:[&_svg]:stroke-neutral-8 w-full sm:w-auto"
      >
        Посмотреть, что внутри
      </ButtonLink>
    </div>
  );
}
