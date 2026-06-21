import { ZapIcon } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";

export function WaitlistLandingHeroBadge() {
  return (
    <Badge
      icon={<ZapIcon />}
      color="custom"
      className="bg-accent-1 text-accent-7 [&_svg]:stroke-accent-7"
    >
      Скоро запуск · ранний доступ
    </Badge>
  );
}
