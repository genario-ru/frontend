export type ArchiveItemActionsProps = {
  id: string;
  entity: "ideasList" | "scenario";
  isArchiveItemActionsOpened: boolean;
  isDeleteArchiveItemDialogOpen: boolean;
  isDeleteArchiveItemPending: boolean;
  setIsArchiveItemActionsOpened: (isOpen: boolean) => void;
  setIsDeleteArchiveItemDialogOpen: (isOpen: boolean) => void;
  handleDeleteArchiveItem: () => void;
};
