import { useCallback, useState } from "react";

import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

export function useScenarioChapterSceneComponentCard() {
  const { isMobile } = useBreakpoints();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleOpenEditDialog = useCallback(() => {
    setIsEditDialogOpen(true);
  }, []);

  return {
    isMobile,
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleOpenEditDialog,
  };
}
