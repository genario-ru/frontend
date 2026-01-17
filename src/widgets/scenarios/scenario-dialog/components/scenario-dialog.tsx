import { type ReactNode, useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useScenarioSettings } from "../hooks/use-scenario-dialog";
import { ScenarioSettingsForm } from "./scenario-dialog-form";

type ScenarioSettingsProps = {
  scenarioId?: string;
  trigger: ReactNode;
};

export function ScenarioSettings({ scenarioId, trigger }: ScenarioSettingsProps) {
  const {
    dialogOverlayRef,
    dialogContentRef,
    scenarioData,
    scenarioSettingsTitle,
    scenarioSettingsDescription,
    isLoading,
    isError,
    isDialogOpen,
    setIsDialogOpen,
    onDialogClose,
  } = useScenarioSettings({ scenarioId });

  const body = useMemo(() => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error...</div>;
    }

    return (
      <>
        <DialogPredefinedHeader
          title={scenarioSettingsTitle}
          description={scenarioSettingsDescription}
        />
        <ScenarioSettingsForm
          dialogContentRef={dialogContentRef}
          dialogOverlayRef={dialogOverlayRef}
          scenarioData={scenarioData}
          onDialogClose={onDialogClose}
        />
      </>
    );
  }, [
    dialogContentRef,
    dialogOverlayRef,
    scenarioData,
    scenarioSettingsTitle,
    scenarioSettingsDescription,

    isLoading,
    isError,
    onDialogClose,
  ]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent overlayRef={dialogOverlayRef} className="max-w-2xl">
        {body}
      </DialogContent>
    </Dialog>
  );
}
