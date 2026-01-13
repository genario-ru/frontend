import { useCallback, useState } from "react";

export function useIdeasListMenubarActions() {
  const [isChangeParamsDialogOpen, setIsChangeParamsDialogOpen] =
    useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleChangeParamsButtonClick = useCallback(() => {
    setIsChangeParamsDialogOpen(true);
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  return {
    isChangeParamsDialogOpen,
    isDeleteDialogOpen,
    handleChangeParamsButtonClick,
    handleDeleteButtonClick,
  };
}
