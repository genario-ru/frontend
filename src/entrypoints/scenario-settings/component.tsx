import { useSearch } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ScenarioSettings } from "@/widgets/scenario-settings/scenario-settings/components/scenario-settings";
import { ScenarioSettingsAppMenubar } from "@/widgets/scenario-settings/scenario-settings-app-menubar/components/scenario-settings-app-menubar";

export function ScenarioSettingsComponent() {
  const { templateId, scenarioId } = useSearch({
    from: "/_app/scenarios/settings",
  });

  return (
    <>
      <ScenarioSettingsAppMenubar />
      <PageLayout className="flex-1">
        <ScenarioSettings templateId={templateId} scenarioId={scenarioId} />
      </PageLayout>
    </>
  );
}
