const optimisticProfileReferenceIdPrefix = "optimistic-profile-reference:";

export function createOptimisticProfileReferenceId() {
  return `${optimisticProfileReferenceIdPrefix}${crypto.randomUUID()}`;
}

export function isOptimisticProfileReferenceId(id: string) {
  return id.startsWith(optimisticProfileReferenceIdPrefix);
}
