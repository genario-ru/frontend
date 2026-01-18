import { useMemo } from "react";

import { BadgesList } from "@/features/badges/badges-list/badges-list";
import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { TemplateBadge } from "@/features/templates/template-badge/components/template-badge";
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
    scenarioTitle,
    scenarioDescription,
    isScenarioLoading,
  } = useScenarioAppMenubar({ scenarioId });

  const title = useMemo(() => {
    if (isScenarioLoading) {
      return <TextSkeleton fontSize={24} lineHeight={32} className="w-64" />;
    }

    return scenarioTitle;
  }, [scenarioTitle, isScenarioLoading]);

  const firstLine = useMemo(() => {
    if (isScenarioLoading) {
      return <Skeleton className="rounded-2.5 h-8 w-24" />;
    }

    if (scenarioData?.data.template) {
      return (
        <TemplateBadge
          size="base"
          name={scenarioData.data.template.name}
          icon={scenarioData.data.template.icon}
          color={scenarioData.data.template.color}
        />
      );
    }

    return null;
  }, [scenarioData, isScenarioLoading]);

  const description = useMemo(() => {
    if (isScenarioLoading) {
      return <TextSkeleton fontSize={16} lineHeight={24} linesCount={2} />;
    }

    return scenarioDescription;
  }, [scenarioDescription, isScenarioLoading]);

  const left = useMemo(() => {
    if (isScenarioLoading) {
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

    return (
      <BadgesList
        badgesData={[
          scenarioData?.data.platform,
          scenarioData?.data.videoType,
          scenarioData?.data.videoDuration,
          scenarioData?.data.tones,
        ]}
      />
    );
  }, [scenarioData, isScenarioLoading]);

  return (
    <AppMenubar
      title={title}
      firstLine={firstLine}
      description={description}
      left={left}
      right={
        <div className="flex h-full flex-col items-end justify-between gap-4">
          <ScenarioAppMenubarActions
            scenarioId={scenarioId}
            isScenarioLoading={isScenarioLoading}
            initialSaved={scenarioData?.data.saved ?? false}
          />
          <ScenarioAppMenubarTabs scenarioId={scenarioId} />
        </div>
      }
    />
  );
}
