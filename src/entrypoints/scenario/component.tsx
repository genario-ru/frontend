import { useParams, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { scenarioTabs } from "@/shared/constants/scenario-tabs";
import { ScenarioAppMenubar } from "@/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar";
import { ScenarioChapter } from "@/widgets/scenario/scenario-chapter/components/scenario-chapter";
import { ScenarioGenerationAlert } from "@/widgets/scenario/scenario-generation-alert/components/scenario-generation-alert";
import { ScenarioNavigation } from "@/widgets/scenario/scenario-navigation/components/scenario-navigation";
import { ScenarioReferences } from "@/widgets/scenario/scenario-references/components/scenario-references";

export function ScenarioComponent() {
  const { scenarioId } = useParams({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const { tab } = useSearch({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const body = useMemo(() => {
    if (tab === scenarioTabs.reference) {
      return <ScenarioReferences />;
    }

    return (
      <ContentLayout className="flex-1">
        <ScenarioGenerationAlert scenarioId={scenarioId} />
        <ScenarioChapter scenarioId={scenarioId} />
        <ScenarioNavigation scenarioId={scenarioId} />
      </ContentLayout>
    );
  }, [tab, scenarioId]);

  return (
    <>
      <ScenarioAppMenubar scenarioId={scenarioId} />
      <PageLayout className="flex-1 pb-0">{body}</PageLayout>
    </>
  );
}
