import { useCallback, useState } from "react";

import { useSaveScenario } from "@/actions/scenarios/hooks/use-save-scenario";

type UseScenarioAppMenubarSaveParams = {
  scenarioId: string;
  initialSaved: boolean;
};

export function useScenarioAppMenubarSave({
  scenarioId,
  initialSaved,
}: UseScenarioAppMenubarSaveParams) {
  const [isOptimisticSaved, setIsOptimisticSaved] = useState(initialSaved);

  const { saveScenario, isSaveScenarioPending } = useSaveScenario({
    onError: () => {
      setIsOptimisticSaved(isOptimisticSaved);
    },
  });

  const handleSaveButtonClick = useCallback(() => {
    const newSaved = !isOptimisticSaved;

    setIsOptimisticSaved(newSaved);

    saveScenario({
      path: {
        scenarioId,
      },
      body: {
        saved: newSaved,
      },
    });
  }, [scenarioId, isOptimisticSaved, saveScenario]);

  return {
    isOptimisticSaved,
    isSaveScenarioPending,
    handleSaveButtonClick,
  };
}
