import type { ScenarioMetadataExtendedSchema } from "@/codegen/api/product";
import { ScenarioMetadataCard } from "@/features/scenario/scenario-metadata/scenario-metadata-card/components/scenario-metadata-card";
import { ScenarioMetadataCardRegenerateDialog } from "@/widgets/scenario/scenario-metadata/components/scenario-metadata-card-regenerate-dialog";

import { useScenarioMetadataCardRegenerateDialog } from "../hooks/use-scenario-metadata-card-regenerate-dialog";

type ScenarioMetadataCardWithDialogProps = {
  scenarioId: string;
  metadata: ScenarioMetadataExtendedSchema;
};

export function ScenarioMetadataCardWithDialog({
  scenarioId,
  metadata,
}: ScenarioMetadataCardWithDialogProps) {
  const {
    form,
    isOpen,
    isRegenerateScenarioMetadataPending,
    handleOpen,
    handleOpenChange,
    onFormSubmit,
  } = useScenarioMetadataCardRegenerateDialog({
    scenarioId,
    platformId: metadata.platform.id,
  });

  return (
    <>
      <ScenarioMetadataCard
        metadata={metadata}
        onRegenerateButtonClick={handleOpen}
      />
      <ScenarioMetadataCardRegenerateDialog
        form={form}
        platformName={metadata.platform.name}
        isOpen={isOpen}
        isPending={isRegenerateScenarioMetadataPending}
        onOpenChange={handleOpenChange}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
}
