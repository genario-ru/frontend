import { Badge } from "@/shared/components/ui/badge";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

type ArchiveItemBadgeProps = {
  name: string;
  icon?: string | null;
};

export function ArchiveItemBadge({ name, icon }: ArchiveItemBadgeProps) {
  return (
    <Badge
      size="sm"
      variant="tertiary"
      icon={icon && <LucideIcon icon={icon} />}
    >
      {name}
    </Badge>
  );
}
