import { useMemo } from "react";

import { Badge, type BadgeProps } from "@/shared/components/ui/badge";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

import type { BadgesListInput } from "../types/badges-list";
import { prepareBadgesListDisplay } from "../utils/prepare-badges-list-display";

type BadgesListProps = PropsWithClassName<{
  badgesData: BadgesListInput;
  badgeProps?: BadgeProps;
  clamp?: number;
}>;

export function BadgesList({
  badgesData,
  badgeProps,
  clamp,
  className,
}: BadgesListProps) {
  const { visibleBadges, overflowCount } = useMemo(
    () => prepareBadgesListDisplay(badgesData, clamp),
    [badgesData, clamp],
  );

  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {visibleBadges.map((badge) => (
        <Badge
          key={`badges-list-badge-${badge.name}`}
          color={badge.color ? "custom" : "neutral"}
          customColor={badge.color}
          icon={badge.icon && <LucideIcon icon={badge.icon} />}
          {...badgeProps}
        >
          {badge.name}
        </Badge>
      ))}
      {overflowCount > 0 && <Badge variant="secondary">+{overflowCount}</Badge>}
    </div>
  );
}
