import { isOptimisticProfileReferenceId } from "./create-optimistic-profile-reference-id";

type HandleDeleteProfileReferenceItemParams<TItem extends { id: string }> = {
  item: TItem;
  onOptimisticDelete: (item: TItem) => void;
  onServerDelete: () => void;
};

export function handleDeleteProfileReferenceItem<TItem extends { id: string }>({
  item,
  onOptimisticDelete,
  onServerDelete,
}: HandleDeleteProfileReferenceItemParams<TItem>) {
  if (isOptimisticProfileReferenceId(item.id)) {
    onOptimisticDelete(item);
    return;
  }

  onServerDelete();
}
