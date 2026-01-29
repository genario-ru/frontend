import { useParams, useSearch } from "@tanstack/react-router";
import { useMemo, useRef } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { scenarioTabs } from "@/shared/constants/scenario-tabs";
import { ScenarioAppMenubar } from "@/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar";
import { ScenarioChapter } from "@/widgets/scenario/scenario-chapter/components/scenario-chapter";
import { ScenarioNavigationFloating } from "@/widgets/scenario/scenario-navigation/components/scenario-navigation-floating";
import { ScenarioNavigationStatic } from "@/widgets/scenario/scenario-navigation/components/scenario-navigation-static";
import { ScenarioReferences } from "@/widgets/scenario/scenario-references/components/scenario-references";

export function ScenarioComponent() {
  const { scenarioId } = useParams({ from: "/_app/scenarios/$scenarioId" });
  const { tab } = useSearch({ from: "/_app/scenarios/$scenarioId" });
  const staticNavigationRef = useRef<HTMLDivElement>(null);

  const body = useMemo(() => {
    if (tab === scenarioTabs.reference) {
      return <ScenarioReferences />;
    }

    return (
      <ContentLayout className="flex-1 gap-4">
        <ScenarioChapter scenarioId={scenarioId} />
        <ScenarioNavigationStatic
          scenarioId={scenarioId}
          ref={staticNavigationRef}
        />
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
      <PageLayout className="flex-1">{body}</PageLayout>
    </>
  );
}
