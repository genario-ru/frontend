import { ZapIcon } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";

export function WaitlistLandingHeroBadge() {
  return (
    <Badge
      icon={<ZapIcon />}
      color="custom"
      className="bg-neutral-1/10 text-neutral-1 dark:bg-neutral-8/10 dark:text-neutral-8 [&_svg]:stroke-accent-5 w-fit backdrop-blur-sm"
    >
      Открываем ранний доступ по заявкам
    </Badge>
  );
}
