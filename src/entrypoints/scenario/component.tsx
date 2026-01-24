import { useParams, useSearch } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useRef } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { scenarioTabs } from "@/shared/constants/scenario-tabs";
import { ScenarioAppMenubar } from "@/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar";

const ScenarioNavigationFloating = lazy(() =>
  import("@/widgets/scenario/scenario-navigation/components/scenario-navigation-floating").then(
    ({ ScenarioNavigationFloating }) => ({
      default: ScenarioNavigationFloating,
    }),
  ),
);

const ScenarioNavigationStatic = lazy(() =>
  import("@/widgets/scenario/scenario-navigation/components/scenario-navigation-static").then(
    ({ ScenarioNavigationStatic }) => ({
      default: ScenarioNavigationStatic,
    }),
  ),
);

const ScenarioChapters = lazy(() =>
  import("@/widgets/scenario/scenario-chapters/components/scenario-chapters").then(
    ({ ScenarioChapters }) => ({
      default: ScenarioChapters,
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
  const staticNavigationRef = useRef<HTMLDivElement>(null);

  const body = useMemo(() => {
    if (tab === scenarioTabs.reference) {
      return <ScenarioReferences />;
    }

    return (
      <ContentLayout>
        <ScenarioNavigationStatic
          scenarioId={scenarioId}
          ref={staticNavigationRef}
        />
        <ScenarioChapters scenarioId={scenarioId} />
        <ScenarioNavigationFloating
          scenarioId={scenarioId}
          staticNavigationRef={staticNavigationRef}
        />
      </ContentLayout>
    );
  }, [tab, scenarioId]);

  return (
    <>
      <ScenarioAppMenubar scenarioId={scenarioId} />
      <PageLayout className="relative flex-1 overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>{body}</Suspense>
      </PageLayout>
    </>
  );
}
