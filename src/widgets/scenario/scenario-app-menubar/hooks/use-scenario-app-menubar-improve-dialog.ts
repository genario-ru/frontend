import { useState } from "react";

export function useScenarioAppMenubarImproveDialog() {
  const [isImproveDialogOpen, setIsImproveDialogOpen] = useState(false);

  return {
    isImproveDialogOpen,
    setIsImproveDialogOpen,
  };
}
