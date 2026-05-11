import { useArchiveItemActions } from "../hooks/use-archive-item-actions";
import { ArchiveItemActionsDropdown } from "./archive-item-actions-dropdown";

export type ArchiveItemHoverActionsProps = {
  id: string;
  entity: "ideasList" | "scenario";
};

export function ArchiveItemHoverActions({
  id,
  entity,
}: ArchiveItemHoverActionsProps) {
  const {
    isArchiveItemActionsOpened,
    isDeleteArchiveItemDialogOpen,
    isDeleteArchiveItemPending,
    setIsArchiveItemActionsOpened,
    setIsDeleteArchiveItemDialogOpen,
    handleDeleteArchiveItem,
  } = useArchiveItemActions({ id, entity });

  return (
    <ArchiveItemActionsDropdown
      id={id}
      entity={entity}
      isArchiveItemActionsOpened={isArchiveItemActionsOpened}
      isDeleteArchiveItemDialogOpen={isDeleteArchiveItemDialogOpen}
      isDeleteArchiveItemPending={isDeleteArchiveItemPending}
      setIsArchiveItemActionsOpened={setIsArchiveItemActionsOpened}
      setIsDeleteArchiveItemDialogOpen={setIsDeleteArchiveItemDialogOpen}
      handleDeleteArchiveItem={handleDeleteArchiveItem}
    />
  );
}
