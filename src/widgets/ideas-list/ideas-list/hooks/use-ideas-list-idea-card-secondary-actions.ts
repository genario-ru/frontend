import { type RefObject, useCallback, useState } from "react";

import { useUpdateIdea } from "@/actions/ideas/hooks/use-update-idea";

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

  const { updateIdea } = useUpdateIdea({
    onError: () => {
      setIsOptimisticSaved(isOptimisticSaved);
    },
  });

  const handleSaveButtonClick = useCallback(() => {
    const newSaved = !isOptimisticSaved;

    setIsOptimisticSaved(newSaved);

    updateIdea({
      path: {
        ideaId,
      },
      body: {
        saved: newSaved,
      },
    });
  }, [ideaId, isOptimisticSaved, updateIdea]);

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
