import { ZapIcon } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";

export function LandingHeroBadge() {
  return (
    <Badge
      icon={<ZapIcon />}
      color="custom"
      className="bg-accent-1 text-accent-6 [&_svg]:stroke-accent-6"
    >
      Какая-то очень притягивающая информация
    </Badge>
  );
}
