import { useParams, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { scenarioTabs } from "@/shared/constants/scenario-tabs";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { ScenarioAppMenubar } from "@/widgets/scenario/scenario-app-menubar/components/scenario-app-menubar";
import { ScenarioChapter } from "@/widgets/scenario/scenario-chapter/components/scenario-chapter";
import { ScenarioGenerationAlert } from "@/widgets/scenario/scenario-generation-alert/components/scenario-generation-alert";
import { ScenarioMetadata } from "@/widgets/scenario/scenario-metadata/components/scenario-metadata";
import { ScenarioNavigationDesktop } from "@/widgets/scenario/scenario-navigation/components/scenario-navigation-desktop";
import { ScenarioNavigationMobile } from "@/widgets/scenario/scenario-navigation/components/scenario-navigation-mobile";

export function ScenarioComponent() {
  const { isMobile } = useBreakpoints();

  const { scenarioId } = useParams({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const { tab } = useSearch({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const body = useMemo(() => {
    if (tab === scenarioTabs.metadata) {
      return (
        <ContentLayout className="flex-1">
          <ScenarioMetadata scenarioId={scenarioId} />
        </ContentLayout>
      );
    }

    return (
      <ContentLayout className="flex-1">
        <ScenarioGenerationAlert scenarioId={scenarioId} />
        <ScenarioChapter scenarioId={scenarioId} />
        {isMobile ? (
          <ScenarioNavigationMobile scenarioId={scenarioId} />
        ) : (
          <ScenarioNavigationDesktop scenarioId={scenarioId} />
        )}
      </ContentLayout>
    );
  }, [isMobile, tab, scenarioId]);

  const footer = useMemo(() => {
    if (tab === scenarioTabs.metadata) {
      return <CommonFooter />;
    }
  }, [tab]);

  return (
    <PageLayout className="h-fit min-h-full">
      <ScenarioAppMenubar scenarioId={scenarioId} />
      {body}
      {footer}
    </PageLayout>
  );
}
