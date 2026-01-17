import { useMemo } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useScenarioSettings } from "../hooks/use-scenario-settings";
import { ScenarioSettingsForm } from "./scenario-settings-form";

type ScenarioSettingsProps = {
  scenarioId?: string;
};

export function ScenarioSettings({ scenarioId }: ScenarioSettingsProps) {
  const { scenarioData, isLoading, isError } = useScenarioSettings({
    scenarioId,
  });

  const body = useMemo(() => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error...</div>;
    }

    return <ScenarioSettingsForm scenarioData={scenarioData} />;
  }, [scenarioData, isLoading, isError]);

  return (
    <ContentLayout size="md" className="flex-1">
      {body}
    </ContentLayout>
  );
}
