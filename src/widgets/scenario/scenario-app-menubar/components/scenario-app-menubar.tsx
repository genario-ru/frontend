import { useMemo } from "react";

import { BadgesList } from "@/features/badges/badges-list/components/badges-list";
import { BadgesListCarousel } from "@/features/badges/badges-list/components/badges-list-carousel";
import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { BackButton } from "@/shared/components/common/back-button";
import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useScenarioAppMenubar } from "../hooks/use-scenario-app-menubar";
import { ScenarioAppMenubarActions } from "./scenario-app-menubar-actions";
import { ScenarioAppMenubarMoreActions } from "./scenario-app-menubar-more-actions";
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
    isMobile,
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

    if (!isMobile) {
      return (
        <BadgesList
          badgesData={[
            scenarioData?.data.template,
            scenarioData?.data.platforms,
            scenarioData?.data.videoType,
            scenarioData?.data.videoDuration,
            scenarioData?.data.tones,
          ]}
        />
      );
    }
  }, [scenarioData, isScenarioLoading, isMobile]);

  const right = useMemo(() => {
    if (isMobile) {
      return (
        <ScenarioAppMenubarMoreActions
          withImproveAction
          scenarioId={scenarioId}
          scenarioVersionId={scenarioVersionId}
        />
      );
    }

    return (
      <div className="flex h-full flex-col items-end justify-between gap-4">
        <ScenarioAppMenubarActions
          scenarioId={scenarioId}
          scenarioVersionId={scenarioVersionId}
        />
        <ScenarioAppMenubarTabs scenarioId={scenarioId} />
      </div>
    );
  }, [scenarioId, scenarioVersionId, isMobile]);

  const bottom = useMemo(() => {
    if (isMobile) {
      return (
        <>
          <BadgesListCarousel
            badgesData={[
              scenarioData?.data.template,
              scenarioData?.data.platforms,
              scenarioData?.data.videoType,
              scenarioData?.data.videoDuration,
              scenarioData?.data.tones,
            ]}
          />
          <ScenarioAppMenubarTabs expand scenarioId={scenarioId} />
        </>
      );
    }
  }, [scenarioData, scenarioId, isMobile]);

  return (
    <AppMenubar
      sticky={false}
      actions={<BackButton />}
      title={title}
      description={description}
      left={left}
      right={right}
      bottom={bottom}
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
      item={<Skeleton className="rounded-2.5 h-8 w-24" />}
      className="flex-wrap"
    />
  );
}
