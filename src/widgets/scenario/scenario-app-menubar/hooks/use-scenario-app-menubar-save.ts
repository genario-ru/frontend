import { useCallback, useState } from "react";

import { useSaveScenario } from "@/actions/scenario/hooks/use-save-scenario";

type UseScenarioAppMenubarSaveParams = {
  scenarioId: string;
  initialSaved: boolean;
};

export function useScenarioAppMenubarSave({
  scenarioId,
  initialSaved,
}: UseScenarioAppMenubarSaveParams) {
  const [isOptimisticSaved, setIsOptimisticSaved] = useState(initialSaved);

  const { saveScenario, isSaveScenarioPending } = useSaveScenario();

  const handleSaveButtonClick = useCallback(() => {
    const newSaved = !isOptimisticSaved;

    setIsOptimisticSaved(newSaved);

    saveScenario(
      {
        scenarioId,
        data: {
          saved: newSaved,
        },
      },
      {
        onError: () => {
          setIsOptimisticSaved(isOptimisticSaved);
        },
      },
    );
  }, [scenarioId, isOptimisticSaved, saveScenario]);

  return {
    isOptimisticSaved,
    isSaveScenarioPending,
    handleSaveButtonClick,
  };
}
