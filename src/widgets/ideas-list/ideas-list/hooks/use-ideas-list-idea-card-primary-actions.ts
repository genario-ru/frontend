import { type NavigateOptions } from "@tanstack/react-router";
import { useMemo } from "react";

type UseIdeasListIdeaCardPrimaryActionsParams = {
  ideaId: string;
};

type CreateScenarioLinkOptions = Pick<NavigateOptions, "to" | "search">;

export function useIdeasListIdeaCardPrimaryActions({
  ideaId,
}: UseIdeasListIdeaCardPrimaryActionsParams) {
  const createScenarioLinkOptions: CreateScenarioLinkOptions = useMemo(
    () => ({
      to: "/scenarios/settings",
      search: {
        fromIdeaId: ideaId,
      },
    }),
    [ideaId],
  );

  return {
    createScenarioLinkOptions,
  };
}
