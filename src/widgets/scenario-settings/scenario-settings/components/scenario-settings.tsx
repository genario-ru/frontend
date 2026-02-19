import { useMemo } from "react";

import type { ScenarioSettingsSearch } from "@/routes/_app/scenarios/settings";
import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useScenarioSettings } from "../hooks/use-scenario-settings";
import {
  ScenarioSettingsForm,
  ScenarioSettingsFormErrorPlug,
  ScenarioSettingsFormSkeleton,
} from "./scenario-settings-form";

type ScenarioSettingsProps = ScenarioSettingsSearch;

export function ScenarioSettings({
  templateId,
  scenarioId,
  fromIdeaId,
}: ScenarioSettingsProps) {
  const { scenarioData, ideaData, isLoading, isError } = useScenarioSettings({
    scenarioId,
    fromIdeaId,
  });

  const body = useMemo(() => {
    if (isLoading) {
      return <ScenarioSettingsFormSkeleton />;
    }

    if (isError) {
      return <ScenarioSettingsFormErrorPlug />;
    }

    return (
      <ScenarioSettingsForm
        templateId={templateId}
        scenarioData={scenarioData}
        ideaData={ideaData}
      />
    );
  }, [templateId, scenarioData, ideaData, isLoading, isError]);

  return (
    <ContentLayout size="md" className="flex-1">
      {body}
    </ContentLayout>
  );
}
