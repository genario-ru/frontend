import { useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ScenarioSettingsAppMenubar } from "@/widgets/scenario-settings/scenario-settings-app-menubar/components/scenario-settings-app-menubar";
import { ScenarioSettingsContent } from "@/widgets/scenario-settings/scenario-settings-content/components/scenario-settings-content";

export function ScenarioSettingsComponent() {
  const { scenarioId } = useSearch({ from: "/_app/scenarios/settings" });

  return (
    <>
      <ScenarioSettingsAppMenubar />
      <PageLayout>
        <ScenarioSettingsContent scenarioId={scenarioId} />
      </PageLayout>
    </>
  );
}
