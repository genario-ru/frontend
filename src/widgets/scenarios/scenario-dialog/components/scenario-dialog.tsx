import { type ReactNode, useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useScenarioDialog } from "../hooks/use-scenario-dialog";
import { ScenarioDialogForm } from "./scenario-dialog-form";

type ScenarioDialogProps = {
  scenarioId?: string;
  trigger: ReactNode;
};

export function ScenarioDialog({ scenarioId, trigger }: ScenarioDialogProps) {
  const {
    dialogOverlayRef,
    dialogContentRef,
    scenarioData,
    scenarioDialogTitle,
    scenarioDialogDescription,
    isLoading,
    isError,
    isDialogOpen,
    setIsDialogOpen,
    onDialogClose,
  } = useScenarioDialog({ scenarioId });

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
          title={scenarioDialogTitle}
          description={scenarioDialogDescription}
        />
        <ScenarioDialogForm
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
    scenarioDialogTitle,
    scenarioDialogDescription,

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
