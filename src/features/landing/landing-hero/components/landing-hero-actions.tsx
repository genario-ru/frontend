import { PlayIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { NBSP, RUBLE_SIGN } from "@/shared/constants/unicode";

export function LandingHeroActions() {
  return (
    <div className="flex w-full flex-col items-stretch gap-2 md:w-auto md:flex-row md:items-center">
      <ButtonLink
        size="lg"
        variant="accent"
        priority="primary"
        to="/"
        hash="tariffs"
        className="w-full md:w-auto"
      >
        Попробовать 3 дня за 1{NBSP}
        {RUBLE_SIGN}
      </ButtonLink>
      <Button size="lg" icon={<PlayIcon />} className="w-full md:w-auto">
        Посмотреть демо
      </Button>
    </div>
  );
}
