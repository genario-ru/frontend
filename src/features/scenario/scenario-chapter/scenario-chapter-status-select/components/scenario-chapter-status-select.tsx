import { type CSSProperties, useMemo } from "react";

import type { ProductionStatusSchema } from "@/codegen/api/product/models";
import { ScenarioVersionRadioIndicator } from "@/features/scenario/scenario-app-menubar/components/scenario-version-radio-indicator";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

type ScenarioChapterStatusSelectProps = {
  statuses: ProductionStatusSchema[];
  activeProductionStatusId: string | undefined;
  isUpdatePending: boolean;
  onSelectStatus: (id: string) => void;
};

export function ScenarioChapterStatusSelect({
  statuses,
  activeProductionStatusId,
  isUpdatePending,
  onSelectStatus,
}: ScenarioChapterStatusSelectProps) {
  const activeProductionStatus = useMemo(
    () => statuses.find((status) => status.id === activeProductionStatusId),
    [statuses, activeProductionStatusId],
  );

  const hasCustomColor = Boolean(activeProductionStatus?.color);

  const triggerStyle: CSSProperties | undefined = activeProductionStatus?.color
    ? ({ "--status-color": activeProductionStatus.color } as CSSProperties)
    : undefined;

  const icon = activeProductionStatus?.icon && (
    <LucideIcon icon={activeProductionStatus.icon} size="sm" />
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          style={triggerStyle}
          disabled={isUpdatePending}
          icon={icon}
          className={cn("cursor-pointer gap-1.5", {
            "bg-(--status-color)/10 text-(--status-color) hover:bg-(--status-color)/20 active:bg-(--status-color)/20 [&_svg]:stroke-(--status-color)":
              hasCustomColor,
            "bg-neutral-2 text-neutral-8": !hasCustomColor,
          })}
        >
          {activeProductionStatus?.name ?? "Выбрать статус"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          {statuses.map((status) => {
            const isActive = status.id === activeProductionStatusId;
            const onClick = () => onSelectStatus(status.id);

            return (
              <DropdownMenuItem key={status.id} asChild>
                <Button
                  key={status.id}
                  priority="tertiary"
                  iconPosition="left"
                  align="start"
                  icon={<ScenarioVersionRadioIndicator checked={isActive} />}
                  onClick={onClick}
                  className="w-full"
                >
                  <div className="flex flex-col">
                    <p className="truncate text-left">{status.name}</p>
                    {status.description && (
                      <p className="text-neutral-7 truncate text-left text-xs">
                        {status.description}
                      </p>
                    )}
                  </div>
                </Button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ScenarioChapterStatusSelectSkeleton() {
  return <Skeleton className="rounded-2 h-8 w-24" />;
}
