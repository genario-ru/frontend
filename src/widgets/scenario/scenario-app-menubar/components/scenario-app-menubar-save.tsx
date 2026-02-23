import { BookmarkIcon, BookmarkXIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { useScenarioAppMenubarSave } from "../hooks/use-scenario-app-menubar-save";

type ScenarioAppMenubarSaveProps = {
  scenarioId: string;
  initialSaved: boolean;
};

export function ScenarioAppMenubarSave({
  scenarioId,
  initialSaved,
}: ScenarioAppMenubarSaveProps) {
  const { isOptimisticSaved, isSaveScenarioPending, handleSaveButtonClick } =
    useScenarioAppMenubarSave({ scenarioId, initialSaved });

  return (
    <Button
      priority="tertiary"
      onClick={handleSaveButtonClick}
      disabled={isSaveScenarioPending}
      icon={isOptimisticSaved ? <BookmarkXIcon /> : <BookmarkIcon />}
    />
  );
}
