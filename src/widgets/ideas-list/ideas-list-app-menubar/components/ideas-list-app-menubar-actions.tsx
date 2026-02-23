import { PencilIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";

import { IdeasListAppMenubarDeleteIdeaDialog } from "./ideas-list-app-menubar-delete-idea-dialog";
import { IdeasListAppMenubarMoreIdeasDialog } from "./ideas-list-app-menubar-more-ideas-dialog";

type IdeasListAppMenubarActionsProps = {
  ideasListId: string;
};

export function IdeasListAppMenubarActions({
  ideasListId,
}: IdeasListAppMenubarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <IdeasListAppMenubarMoreIdeasDialog ideasListId={ideasListId} />
      <ButtonLink
        priority="tertiary"
        to="/ideas-lists/settings"
        search={{
          ideasListId,
        }}
        icon={<PencilIcon />}
      />
      <IdeasListAppMenubarDeleteIdeaDialog ideasListId={ideasListId} />
    </div>
  );
}
