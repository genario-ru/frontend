export type ArchiveItemActionsDeleteProps = {
  entity: "ideasList" | "scenario";
  isDialogOpened: boolean;
  isDeleteArchiveItemPending: boolean;
  setIsDialogOpened: (isOpen: boolean) => void;
  onConfirmDeleteArchiveItem: () => void;
};
