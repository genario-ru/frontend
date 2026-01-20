import { useParams, useSearch } from "@tanstack/react-router";
import { lazy, Suspense, useMemo } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { scenarioTabs } from "@/shared/constants/scenario-tabs";
import { ScenarioAppMenubar } from "@/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar";

const ScenarioChaptersList = lazy(() =>
  import("@/widgets/scenario/scenario-chapters-list/components/scenario-chapters-list").then(
    ({ ScenarioChaptersList }) => ({
      default: ScenarioChaptersList,
    }),
  ),
);

const ScenarioChapter = lazy(() =>
  import("@/widgets/scenario/scenario-chapter/components/scenario-chapter").then(
    ({ ScenarioChapter }) => ({
      default: ScenarioChapter,
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
      <ContentLayout className="grid h-full w-full grid-cols-4 flex-row gap-4">
        <ScenarioChaptersList scenarioId={scenarioId} />
        <ScenarioChapter scenarioId={scenarioId} />
      </ContentLayout>
    );
  }, [tab, scenarioId]);

  return (
    <div className="flex h-dvh max-h-dvh flex-col">
      <ScenarioAppMenubar scenarioId={scenarioId} />
      <PageLayout className="flex-1 overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>{body}</Suspense>
      </PageLayout>
    </div>
  );
}
