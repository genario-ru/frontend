import {
  ScenarioChapterStatusSelect,
  ScenarioChapterStatusSelectSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-status-select/components/scenario-chapter-status-select";

import { useScenarioChapterStatus } from "../hooks/use-scenario-chapter-status";

type ScenarioChapterStatusProps = {
  chapterId: string;
};

export function ScenarioChapterStatus({
  chapterId,
}: ScenarioChapterStatusProps) {
  const {
    productionStatuses,
    activeProductionStatus,
    isUpdatePending,
    isLoading,
    handleSelectStatus,
  } = useScenarioChapterStatus({ chapterId });

  if (isLoading) {
    return <ScenarioChapterStatusSelectSkeleton />;
  }

  return (
    <ScenarioChapterStatusSelect
      statuses={productionStatuses}
      activeProductionStatusId={activeProductionStatus?.id}
      isUpdatePending={isUpdatePending}
      onSelectStatus={handleSelectStatus}
    />
  );
}
