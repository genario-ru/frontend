import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import { useGetScenarioVersions } from "@/actions/scenario/hooks/use-get-scenario-versions";

import { formatScenarioVersionLabel } from "../utils/format-scenario-version-label";

type UseScenarioAppMenubarVersionsSubmenuParams = {
  scenarioId: string;
};

type VersionItem = {
  id: string;
  label: string;
};

export function useScenarioAppMenubarVersionsSubmenu({
  scenarioId,
}: UseScenarioAppMenubarVersionsSubmenuParams) {
  const { versionId: selectedVersionId } = useSearch({
    from: "/_with-auth/_with-subscription/scenarios/$scenarioId",
  });

  const { scenarioVersionsData, isScenarioVersionsLoading } =
    useGetScenarioVersions({ scenarioId });

  const versionItems = useMemo<VersionItem[]>(() => {
    const versionsList = scenarioVersionsData?.data;

    if (!versionsList?.length) {
      return [];
    }

    return versionsList.map((version, index) => ({
      id: version.id,
      label: formatScenarioVersionLabel(
        versionsList.length - index,
        version.createdAt,
      ),
    }));
  }, [scenarioVersionsData]);

  const activeVersionId = useMemo(() => {
    if (selectedVersionId) {
      return selectedVersionId;
    }

    return versionItems[0]?.id;
  }, [selectedVersionId, versionItems]);

  return {
    versionItems,
    activeVersionId,
    isVersionItemsLoading: isScenarioVersionsLoading,
  };
}
