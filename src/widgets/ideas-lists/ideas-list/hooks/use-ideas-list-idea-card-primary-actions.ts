import { type NavigateOptions } from "@tanstack/react-router";
import { useMemo, useState } from "react";

type UseIdeasListIdeaCardPrimaryActionsParams = {
  ideaId: string;
};

type CreateScenarioLinkOptions = Pick<NavigateOptions, "to" | "search">;

export function useIdeasListIdeaCardPrimaryActions({
  ideaId,
}: UseIdeasListIdeaCardPrimaryActionsParams) {
  const [isImproveResultDialogOpened, setIsImproveResultDialogOpened] =
    useState(false);

  const createScenarioLinkOptions: CreateScenarioLinkOptions = useMemo(
    () => ({
      to: "/scenarios/config",
      search: {
        fromIdeaId: ideaId,
      },
    }),
    [ideaId],
  );

  return {
    isImproveResultDialogOpened,
    createScenarioLinkOptions,
    setIsImproveResultDialogOpened,
  };
}
