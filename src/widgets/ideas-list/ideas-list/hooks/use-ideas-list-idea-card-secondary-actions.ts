import { type RefObject, useCallback, useState } from "react";

import { useSaveIdea } from "@/actions/ideas/hooks/use-save-idea";

type UseIdeasListIdeaCardSecondaryActionsParams = {
  ideaId: string;
  initialSaved: boolean;
  copyElementRef: RefObject<HTMLParagraphElement | null>;
};

export function useIdeasListIdeaCardSecondaryActions({
  ideaId,
  initialSaved,
}: UseIdeasListIdeaCardSecondaryActionsParams) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOptimisticSaved, setIsOptimisticSaved] = useState(initialSaved);

  const { saveIdea } = useSaveIdea({
    onError: () => {
      setIsOptimisticSaved(isOptimisticSaved);
    },
  });

  const handleSaveButtonClick = useCallback(() => {
    const newSaved = !isOptimisticSaved;

    setIsOptimisticSaved(newSaved);

    saveIdea({
      ideaId,
      data: {
        saved: newSaved,
      },
    });
  }, [ideaId, isOptimisticSaved, saveIdea]);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return {
    isOptimisticSaved,
    isMenuOpen,
    setIsMenuOpen,
    handleSaveButtonClick,
    handleCloseMenu,
  };
}
