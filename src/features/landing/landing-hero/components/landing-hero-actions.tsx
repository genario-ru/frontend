import { PlayIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";

export function LandingHeroActions() {
  return (
    <div className="flex w-full flex-col items-stretch gap-2 md:w-auto md:flex-row md:items-center">
      <ButtonLink
        size="lg"
        variant="accent"
        priority="primary"
        to="/sign-in"
        className="w-full md:w-auto"
      >
        Попробовать бесплатно
      </ButtonLink>
      <Button size="lg" icon={<PlayIcon />} className="w-full md:w-auto">
        Посмотреть демо
      </Button>
    </div>
  );
}
