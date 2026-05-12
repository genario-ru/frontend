import { type CSSProperties, useMemo, useState } from "react";

import { ScenarioVersionRadioIndicator } from "@/features/scenario/scenario-app-menubar/components/scenario-version-radio-indicator";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

import type { ScenarioChapterStatusSelectProps } from "./scenario-chapter-status-select";

export function ScenarioChapterStatusSelectDrawer({
  statuses,
  activeProductionStatusId,
  isUpdatePending,
  onSelectStatus,
}: ScenarioChapterStatusSelectProps) {
  const [open, setOpen] = useState(false);

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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
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
        }
      />
      <DrawerContent>
        <DrawerHeader title="Статус сценария" />
        <DrawerSection roundedBottom={false}>
          {statuses.map((status) => {
            const isActive = status.id === activeProductionStatusId;

            return (
              <Button
                key={status.id}
                priority="tertiary"
                iconPosition="left"
                align="start"
                icon={<ScenarioVersionRadioIndicator checked={isActive} />}
                onClick={() => {
                  onSelectStatus(status.id);
                  setOpen(false);
                }}
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
            );
          })}
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
