import { type ReactNode, useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogPredefinedHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useIdeasListDialog } from "../hooks/use-ideas-list-dialog";
import { IdeasListDialogForm } from "./ideas-list-dialog-form";

type IdeasListDialogProps = {
  ideasListId?: string;
  trigger: ReactNode;
};

export function IdeasListDialog({
  ideasListId,
  trigger,
}: IdeasListDialogProps) {
  const {
    dialogOverlayRef,
    dialogContentRef,
    ideasListData,
    ideasListDialogTitle,
    ideasListDialogDescription,
    isLoading,
    isError,
    isDialogOpen,
    setIsDialogOpen,
    onDialogClose,
  } = useIdeasListDialog({ ideasListId });

  const body = useMemo(() => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error...</div>;
    }

    if (ideasListData) {
      return (
        <>
          <DialogPredefinedHeader
            title={ideasListDialogTitle}
            description={ideasListDialogDescription}
          />
          <IdeasListDialogForm
            dialogContentRef={dialogContentRef}
            dialogOverlayRef={dialogOverlayRef}
            ideasListData={ideasListData}
            onDialogClose={onDialogClose}
          />
        </>
      );
    }

    return null;
  }, [
    dialogContentRef,
    dialogOverlayRef,
    ideasListData,
    ideasListDialogTitle,
    ideasListDialogDescription,

    isLoading,
    isError,
    onDialogClose,
  ]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent overlayRef={dialogOverlayRef} className="max-w-2xl">
        {body}
      </DialogContent>
    </Dialog>
  );
}
