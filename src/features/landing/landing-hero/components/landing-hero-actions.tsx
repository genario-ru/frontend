import { PlayIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";

export function LandingHeroActions() {
  return (
    <div className="flex items-center gap-2">
      <ButtonLink size="lg" variant="accent" priority="primary" to="/sign-in">
        Попробовать бесплатно
      </ButtonLink>
      <Button size="lg" icon={<PlayIcon />}>
        Посмотреть демо
      </Button>
    </div>
  );
}
