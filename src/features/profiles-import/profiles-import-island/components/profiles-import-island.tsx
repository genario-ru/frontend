import type { LucideIcon as LucideIconType } from "lucide-react";

import { Heading } from "@/shared/components/ui/heading";
import { Island, type IslandProps } from "@/shared/components/ui/island";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

type ProfilesImportIslandProps = IslandProps & {
  icon: LucideIconType;
  title: string;
  description?: string;
};

export function ProfilesImportIsland({
  icon,
  title,
  description,
  className,
  children,
  ...props
}: ProfilesImportIslandProps) {
  return (
    <Island className={cn("bg-neutral-2 p-4", className)} {...props}>
      <header className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center gap-2">
          <LucideIcon icon={icon} />
          <Heading variant="h3">{title}</Heading>
        </div>
        {description && <p className="text-neutral-7">{description}</p>}
      </header>
      {children}
    </Island>
  );
}
