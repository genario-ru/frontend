import { useMemo } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { TemplateBadge } from "@/features/templates/template-badge/components/template-badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useScenarioAppMenubar } from "../hooks/use-scenario-app-menubar";
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

  return (
    <AppMenubar
      title={title}
      firstLine={firstLine}
      description={description}
      right={<ScenarioAppMenubarTabs scenarioId={scenarioId} />}
    />
  );
}
