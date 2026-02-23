import { FilmIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";

import { useIdeasListIdeaCardPrimaryActions } from "../hooks/use-ideas-list-idea-card-primary-actions";
// import { IdeasListIdeaCardImproveDialog } from "./ideas-list-idea-card-improve-dialog";

type IdeasListIdeaCardPrimaryActionsProps = {
  ideaId: string;
};

export function IdeasListIdeaCardPrimaryActions({
  ideaId,
}: IdeasListIdeaCardPrimaryActionsProps) {
  const { createScenarioLinkOptions } = useIdeasListIdeaCardPrimaryActions({
    ideaId,
  });

  return (
    <div className="flex items-center justify-end gap-4">
      {/* <IdeasListIdeaCardImproveDialog /> */}
      <ButtonLink
        size="sm"
        priority="primary"
        {...createScenarioLinkOptions}
        icon={<FilmIcon />}
      >
        Создать сценарий
      </ButtonLink>
    </div>
  );
}
