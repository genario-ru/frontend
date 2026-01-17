import { useCallback, useMemo, useRef, useState } from "react";

import { useGetIdeasList } from "@/actions/ideas-lists/hooks/use-get-ideas-list";

import { IDEAS_LIST_DIALOG_DESCRIPTION } from "../constants/ideas-list-dialog-texts";

type UseIdeasListDialogParams = {
  ideasListId: string | undefined;
};

export function useIdeasListDialog({ ideasListId }: UseIdeasListDialogParams) {
  const dialogOverlayRef = useRef<HTMLDivElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const { ideasListData, isIdeasListLoading, isIdeasListError } =
    useGetIdeasList({
      ideasListId,
    });

  const ideasListDialogTitle = useMemo(() => {
    return ideasListData ? "Редактирование списка идей" : "Новый список идей";
  }, [ideasListData]);

  return {
    dialogOverlayRef,
    dialogContentRef,
    ideasListData,
    ideasListDialogTitle,
    ideasListDialogDescription: IDEAS_LIST_DIALOG_DESCRIPTION,
    isLoading: isIdeasListLoading,
    isError: isIdeasListError,
    isDialogOpen,
    setIsDialogOpen,
    onDialogClose,
  };
}
