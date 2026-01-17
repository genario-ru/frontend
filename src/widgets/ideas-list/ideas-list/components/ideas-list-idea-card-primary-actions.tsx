import { FilmIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";

import { useIdeasListIdeaCardPrimaryActions } from "../hooks/use-ideas-list-idea-card-primary-actions";
import { IdeasListIdeaCardImproveDialog } from "./ideas-list-idea-card-improve-dialog";

type IdeasListIdeaCardPrimaryActionsProps = {
  ideaId: string;
};

export function IdeasListIdeaCardPrimaryActions({
  ideaId,
}: IdeasListIdeaCardPrimaryActionsProps) {
  const {
    isImproveResultDialogOpened,
    createScenarioLinkOptions,
    setIsImproveResultDialogOpened,
  } = useIdeasListIdeaCardPrimaryActions({
    ideaId,
  });

  return (
    <div className="flex items-center justify-between gap-4">
      <IdeasListIdeaCardImproveDialog
        isOpened={isImproveResultDialogOpened}
        setIsOpened={setIsImproveResultDialogOpened}
      />
      <ButtonLink
        variant="primary"
        {...createScenarioLinkOptions}
        icon={<FilmIcon />}
      >
        Создать сценарий
      </ButtonLink>
    </div>
  );
}
