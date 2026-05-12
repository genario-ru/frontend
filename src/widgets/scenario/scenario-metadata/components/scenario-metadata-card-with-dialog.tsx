import type { ScenarioMetadataExtendedSchema } from "@/codegen/api/product";
import { ScenarioMetadataCard } from "@/features/scenario/scenario-metadata/scenario-metadata-card/components/scenario-metadata-card";

import { useScenarioMetadataCardRegenerateDialog } from "../hooks/use-scenario-metadata-card-regenerate-dialog";
import { ScenarioMetadataCardRegenerateDialog } from "./scenario-metadata-card-regenerate-dialog";
import { ScenarioMetadataCardRegenerateDrawer } from "./scenario-metadata-card-regenerate-drawer";

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
    isMobile,
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
      {isMobile ? (
        <ScenarioMetadataCardRegenerateDrawer
          form={form}
          platformName={metadata.platform.name}
          isOpen={isOpen}
          isPending={isRegenerateScenarioMetadataPending}
          onOpenChange={handleOpenChange}
          onFormSubmit={onFormSubmit}
        />
      ) : (
        <ScenarioMetadataCardRegenerateDialog
          form={form}
          platformName={metadata.platform.name}
          isOpen={isOpen}
          isPending={isRegenerateScenarioMetadataPending}
          onOpenChange={handleOpenChange}
          onFormSubmit={onFormSubmit}
        />
      )}
    </>
  );
}
