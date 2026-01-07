import type { CSSProperties } from "react";

import { Badge, type BadgeProps } from "@/shared/components/ui/badge";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

type TemplateBadgeProps = Omit<BadgeProps, "color"> & {
  name: string;
  icon?: string | null;
  color?: string;
};

export function TemplateBadge({
  name,
  icon,
  color,
  className,
  ...props
}: TemplateBadgeProps) {
  return (
    <Badge
      color="custom"
      variant="secondary"
      size="sm"
      icon={icon && <LucideIcon icon={icon} />}
      style={
        {
          "--template-color": color,
        } as CSSProperties
      }
      className={cn(
        "bg-(--template-color)/10 text-(--template-color) [&_svg]:stroke-(--template-color)",
        className,
      )}
      {...props}
    >
      {name}
    </Badge>
  );
}
