type PrepareSelectFieldItemsParams = { id: string; name: string };

type PrepareSelectFieldItemsReturn = { value: string; label: string }[];

export const prepareSelectFieldItems = <
  T extends PrepareSelectFieldItemsParams,
>(
  items: T[],
): PrepareSelectFieldItemsReturn => {
  return items.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};
