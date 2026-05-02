import { useCallback, useEffect, useMemo, useState } from "react";

import { useGenerateScenarioMetadata } from "@/actions/scenario/hooks/use-generate-scenario-metadata";
import { useGetScenarioMetadata } from "@/actions/scenario/hooks/use-get-scenario-metadata";

type UseScenarioMetadataParams = {
  scenarioId: string;
};

export function useScenarioMetadata({ scenarioId }: UseScenarioMetadataParams) {
  const {
    scenarioMetadataData,
    isScenarioMetadataLoading,
    isScenarioMetadataError,
  } = useGetScenarioMetadata({ scenarioId });

  const { generateScenarioMetadata, isGenerateScenarioMetadataPending } =
    useGenerateScenarioMetadata();

  const metadataStatus = scenarioMetadataData?.data.status;
  const metadataItems = useMemo(
    () => scenarioMetadataData?.data.items ?? [],
    [scenarioMetadataData],
  );

  // Tracks whether the user has triggered generation in this session.
  // Backend's "pending" status is the initial idle state for never-generated
  // scenarios — we must NOT treat it as "generating" until the user clicks.
  const [hasTriggeredGeneration, setHasTriggeredGeneration] = useState(false);

  useEffect(() => {
    if (metadataStatus === "ready" || metadataStatus === "failed") {
      setHasTriggeredGeneration(false);
    }
  }, [metadataStatus]);

  const isLoading = isScenarioMetadataLoading;
  const isError = isScenarioMetadataError;
  const isFailed = metadataStatus === "failed";
  const isGenerating =
    hasTriggeredGeneration || metadataStatus === "generation";
  const isEmpty =
    !isGenerating &&
    !isFailed &&
    (metadataStatus === "pending" || metadataItems.length === 0);

  const generateMetadata = useCallback(() => {
    generateScenarioMetadata(
      { scenarioId },
      {
        onSuccess: () => {
          setHasTriggeredGeneration(true);
        },
      },
    );
  }, [generateScenarioMetadata, scenarioId]);

  return {
    metadataItems,
    isLoading,
    isError,
    isGenerating,
    isFailed,
    isEmpty,
    generateMetadata,
    isGenerateMetadataPending: isGenerateScenarioMetadataPending,
  };
}
