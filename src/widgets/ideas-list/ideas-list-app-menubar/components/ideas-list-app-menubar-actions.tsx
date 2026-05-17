import { WandSparklesIcon } from "lucide-react";

import { AppMenubarButton } from "@/features/navigation/app-menubar/components/app-menubar-button";

import { useIdeasListAppMenubarMoreIdeasDialog } from "../hooks/use-ideas-list-app-menubar-more-ideas-dialog";
import { IdeasListAppMenubarMoreActions } from "./ideas-list-app-menubar-more-actions";
import { IdeasListAppMenubarMoreIdeasDialog } from "./ideas-list-app-menubar-more-ideas-dialog";

type IdeasListAppMenubarActionsProps = {
  ideasListId: string;
};

export function IdeasListAppMenubarActions({
  ideasListId,
}: IdeasListAppMenubarActionsProps) {
  const {
    form,
    isMoreIdeasDialogOpen,
    isGenerateMoreIdeasPending,
    setIsMoreIdeasDialogOpen,
    onFormSubmit,
  } = useIdeasListAppMenubarMoreIdeasDialog({ ideasListId });

  return (
    <div className="flex items-center gap-2">
      <IdeasListAppMenubarMoreIdeasDialog
        trigger={
          <AppMenubarButton icon={<WandSparklesIcon />}>
            Больше идей
          </AppMenubarButton>
        }
        form={form}
        isMoreIdeasDialogOpen={isMoreIdeasDialogOpen}
        isGenerateMoreIdeasPending={isGenerateMoreIdeasPending}
        setIsMoreIdeasDialogOpen={setIsMoreIdeasDialogOpen}
        onFormSubmit={onFormSubmit}
      />
      <IdeasListAppMenubarMoreActions ideasListId={ideasListId} />
    </div>
  );
}
