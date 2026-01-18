import { isEmpty } from "es-toolkit/compat";
import { useMemo } from "react";

import { Badge, type BadgeProps } from "@/shared/components/ui/badge";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

type BadgeData = {
  name: string;
  icon?: string | null;
};

type BadgesListProps = PropsWithClassName<{
  badgesData: Array<BadgeData | BadgeData[] | null | undefined>;
  badgeProps?: BadgeProps;
}>;

export function BadgesList({
  badgesData,
  badgeProps,
  className,
}: BadgesListProps) {
  const badges: BadgeData[] = useMemo(() => {
    const preparedBadges: BadgeData[] = [];

    badgesData.forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          preparedBadges.push(item);
        });
      } else if (value) {
        preparedBadges.push(value);
      }
    });

    return preparedBadges.filter((badge) => !isEmpty(badge));
  }, [badgesData]);

  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {badges.map((badge) => (
        <Badge
          key={`badges-list-badge-${badge.name}`}
          icon={badge.icon && <LucideIcon icon={badge.icon} />}
          {...badgeProps}
        >
          {badge.name}
        </Badge>
      ))}
    </div>
  );
}
