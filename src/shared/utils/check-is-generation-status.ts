const generationStatuses = ["pending", "generation"];

export function checkIsGenerationStatus(status: string | undefined | null) {
  if (!status) {
    return false;
  }

  return generationStatuses.includes(status);
}
