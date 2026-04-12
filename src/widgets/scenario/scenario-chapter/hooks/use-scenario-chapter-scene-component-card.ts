import { useCallback, useState } from "react";

export function useScenarioChapterSceneComponentCard() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleOpenEditDialog = useCallback(() => {
    setIsEditDialogOpen(true);
  }, []);

  return {
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleOpenEditDialog,
  };
}
