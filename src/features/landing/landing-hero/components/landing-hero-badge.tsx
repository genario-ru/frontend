import { ZapIcon } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";

export function LandingHeroBadge() {
  return (
    <Badge
      icon={<ZapIcon />}
      color="custom"
      className="bg-accent-1 text-accent-7 [&_svg]:stroke-accent-7"
    >
      Какая-то очень притягивающая информация
    </Badge>
  );
}
