import { useCallback, useEffect, useMemo, useState } from "react";

import { useGenerateScenarioMetadata } from "@/actions/scenario/hooks/use-generate-scenario-metadata";
import { useGetScenarioMetadata } from "@/actions/scenario/hooks/use-get-scenario-metadata";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";

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

  const hasGeneratingItems = useMemo(
    () => metadataItems.some((item) => checkIsGenerationStatus(item.status)),
    [metadataItems],
  );

  const [hasTriggeredGeneration, setHasTriggeredGeneration] = useState(false);

  useEffect(() => {
    if (!checkIsGenerationStatus(metadataStatus)) {
      setHasTriggeredGeneration(false);
    }
  }, [metadataStatus]);

  const isLoading = isScenarioMetadataLoading;
  const isError = isScenarioMetadataError;
  const isFailed = metadataStatus === "failed" && metadataItems.length === 0;
  const isGenerating =
    hasTriggeredGeneration || checkIsGenerationStatus(metadataStatus);
  const isEmpty = !isGenerating && !isFailed && metadataItems.length === 0;

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
    hasGeneratingItems,
    isLoading,
    isError,
    isGenerating,
    isFailed,
    isEmpty,
    isGenerateMetadataPending: isGenerateScenarioMetadataPending,
    generateMetadata,
  };
}
