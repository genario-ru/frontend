import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import { scenarioTabs } from "@/shared/constants/scenario-tabs";

type UseScenarioAppMenubarTabsParams = {
  scenarioId: string;
};

type ScenarioAppMenubarTab = {
  slug: string;
  name: string;
  active: boolean;
};

export function useScenarioAppMenubarTabs({
  scenarioId,
}: UseScenarioAppMenubarTabsParams) {
  const navigate = useNavigate();

  const search = useSearch({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const tabs: ScenarioAppMenubarTab[] = useMemo(
    () => [
      {
        slug: scenarioTabs.scenario,
        name: "Сценарий",
        active: search.tab === undefined,
      },
      {
        slug: scenarioTabs.reference,
        name: "Референсы",
        active: search.tab === scenarioTabs.reference,
      },
    ],
    [search.tab],
  );

  const activeTab = useMemo(() => {
    return tabs.find((tab) => tab.active);
  }, [tabs]);

  const handleTabClick = useCallback(
    (slug: string) => {
      const newTab = slug === scenarioTabs.scenario ? undefined : slug;

      navigate({
        to: "/scenarios/$scenarioId",
        params: { scenarioId },
        search: {
          ...search,
          tab: newTab,
        },
        replace: true,
      });
    },
    [scenarioId, search, navigate],
  );

  return {
    tabs,
    activeTab,
    handleTabClick,
  };
}
