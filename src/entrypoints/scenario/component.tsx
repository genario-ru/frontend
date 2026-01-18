import { useParams } from "@tanstack/react-router";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ScenarioAppMenubar } from "@/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar";

export function ScenarioComponent() {
  const { scenarioId } = useParams({ from: "/_app/scenarios/$scenarioId" });

  return (
    <>
      <ScenarioAppMenubar scenarioId={scenarioId} />
      <PageLayout className="flex-1">ds</PageLayout>
    </>
  );
}
