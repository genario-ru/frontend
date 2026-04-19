import { useMemo } from "react";

import { BadgesList } from "@/features/badges/badges-list/badges-list";
import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { BackButton } from "@/shared/components/common/back-button";
import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useScenarioAppMenubar } from "../hooks/use-scenario-app-menubar";
import { ScenarioAppMenubarActions } from "./scenario-app-menubar-actions";
import { ScenarioAppMenubarTabs } from "./scenario-app-menubar-tabs";

type ScenarioAppMenubarParams = {
  scenarioId: string;
};

export function ScenarioAppMenubar({ scenarioId }: ScenarioAppMenubarParams) {
  const {
    scenarioData,
    scenarioVersionId,
    scenarioTitle,
    scenarioDescription,
    isScenarioLoading,
  } = useScenarioAppMenubar({ scenarioId });

  const title = useMemo(() => {
    if (isScenarioLoading) {
      return <ScenarioAppMenubarTitleSkeleton />;
    }

    return scenarioTitle;
  }, [scenarioTitle, isScenarioLoading]);

  const description = useMemo(() => {
    if (isScenarioLoading) {
      return <ScenarioAppMenubarDescriptionSkeleton />;
    }

    return scenarioDescription;
  }, [scenarioDescription, isScenarioLoading]);

  const left = useMemo(() => {
    if (isScenarioLoading) {
      return <ScenarioAppMenubarLeftSkeleton />;
    }

    return (
      <BadgesList
        clamp={4}
        badgesData={[
          scenarioData?.data.template,
          scenarioData?.data.platforms,
          scenarioData?.data.videoType,
          scenarioData?.data.videoDuration,
          scenarioData?.data.tones,
        ]}
      />
    );
  }, [scenarioData, isScenarioLoading]);

  return (
    <AppMenubar
      actions={<BackButton />}
      title={title}
      description={description}
      left={left}
      right={
        <div className="flex h-full flex-col items-end justify-between gap-4">
          <ScenarioAppMenubarActions
            scenarioId={scenarioId}
            scenarioVersionId={scenarioVersionId}
          />
          <ScenarioAppMenubarTabs scenarioId={scenarioId} />
        </div>
      }
    />
  );
}

function ScenarioAppMenubarTitleSkeleton() {
  return <TextSkeleton fontSize={24} lineHeight={32} className="w-64" />;
}

function ScenarioAppMenubarDescriptionSkeleton() {
  return <TextSkeleton fontSize={16} lineHeight={24} linesCount={2} />;
}

function ScenarioAppMenubarLeftSkeleton() {
  return (
    <ItemsList
      row
      count={6}
      gap={4}
      item={<Skeleton className="rounded-2.5 h-[30px] w-24" />}
      className="flex-wrap"
    />
  );
}
