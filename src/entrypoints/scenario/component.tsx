import { useParams, useSearch } from "@tanstack/react-router";
import { lazy, Suspense, useMemo } from "react";

import { scenarioTabs } from "@/features/scenario/constants/scenario-tabs";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ScenarioAppMenubar } from "@/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar";

const ScenarioChaptersList = lazy(() =>
  import("@/widgets/scenario/scenario-chapters-list/components/scenario-chapters-list").then(
    ({ ScenarioChaptersList }) => ({
      default: ScenarioChaptersList,
    }),
  ),
);

const ScenarioScenes = lazy(() =>
  import("@/widgets/scenario/scenarios-scenes/components/scenario-scenes").then(
    ({ ScenarioScenes }) => ({
      default: ScenarioScenes,
    }),
  ),
);

const ScenarioReferences = lazy(() =>
  import("@/widgets/scenario/scenario-references/components/scenario-references").then(
    ({ ScenarioReferences }) => ({
      default: ScenarioReferences,
    }),
  ),
);

export function ScenarioComponent() {
  const { scenarioId } = useParams({ from: "/_app/scenarios/$scenarioId" });
  const { tab } = useSearch({ from: "/_app/scenarios/$scenarioId" });

  const body = useMemo(() => {
    if (tab === scenarioTabs.reference) {
      return <ScenarioReferences />;
    }

    return (
      <ContentLayout className="grid h-full grid-cols-4 flex-row gap-4">
        <ScenarioChaptersList scenarioId={scenarioId} />
        <ScenarioScenes />
      </ContentLayout>
    );
  }, [tab, scenarioId]);

  return (
    <>
      <ScenarioAppMenubar scenarioId={scenarioId} />
      <PageLayout className="h-full">
        <Suspense fallback={<div>Loading...</div>}>{body}</Suspense>
      </PageLayout>
    </>
  );
}
