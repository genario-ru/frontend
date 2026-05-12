import type { ProductionStatusSchema } from "@/codegen/api/product/models";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { ScenarioChapterStatusSelectDrawer } from "./scenario-chapter-status-select-drawer";
import { ScenarioChapterStatusSelectDropdown } from "./scenario-chapter-status-select-dropdown";

export type ScenarioChapterStatusSelectProps = {
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
  const { isMobile } = useBreakpoints();

  if (isMobile) {
    return (
      <ScenarioChapterStatusSelectDrawer
        statuses={statuses}
        activeProductionStatusId={activeProductionStatusId}
        isUpdatePending={isUpdatePending}
        onSelectStatus={onSelectStatus}
      />
    );
  }

  return (
    <ScenarioChapterStatusSelectDropdown
      statuses={statuses}
      activeProductionStatusId={activeProductionStatusId}
      isUpdatePending={isUpdatePending}
      onSelectStatus={onSelectStatus}
    />
  );
}

export function ScenarioChapterStatusSelectSkeleton() {
  return <Skeleton className="rounded-2 h-8 w-24" />;
}
