import { BookImageIcon } from "lucide-react";

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
    <ButtonLink
      icon={<BookImageIcon />}
      className="w-full"
      {...createScenarioLinkOptions}
    >
      Создать сценарий
    </ButtonLink>
  );
}
