import { useParams, useSearch } from "@tanstack/react-router";
import { useMemo, useRef } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { scenarioTabs } from "@/shared/constants/scenario-tabs";
import { ScenarioAppMenubar } from "@/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar";
import { ScenarioChapter } from "@/widgets/scenario/scenario-chapter/components/scenario-chapter";
import { ScenarioGenerationAlert } from "@/widgets/scenario/scenario-generation-alert/components/scenario-generation-alert";
import { ScenarioNavigationFloating } from "@/widgets/scenario/scenario-navigation/components/scenario-navigation-floating";
import { ScenarioNavigationStatic } from "@/widgets/scenario/scenario-navigation/components/scenario-navigation-static";
import { ScenarioReferences } from "@/widgets/scenario/scenario-references/components/scenario-references";

export function ScenarioComponent() {
  const { scenarioId } = useParams({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const { tab } = useSearch({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const staticNavigationRef = useRef<HTMLDivElement>(null);

  const body = useMemo(() => {
    if (tab === scenarioTabs.reference) {
      return <ScenarioReferences />;
    }

    return (
      <ContentLayout className="flex-1 gap-4">
        <ScenarioGenerationAlert scenarioId={scenarioId} />
        <ScenarioNavigationStatic
          scenarioId={scenarioId}
          ref={staticNavigationRef}
        />
        <ScenarioChapter scenarioId={scenarioId} />
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
