export const SORT_ORDER_OPTIONS = ["asc", "desc"] as const;

export type SortOrder = (typeof SORT_ORDER_OPTIONS)[number];
