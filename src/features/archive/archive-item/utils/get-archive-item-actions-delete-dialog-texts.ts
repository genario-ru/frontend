export function getArchiveItemActionsDeleteDialogTexts(
  entity: "ideasList" | "scenario",
) {
  const title =
    entity === "ideasList" ? "Удаление списка идей" : "Удаление сценария";

  const description =
    entity === "ideasList"
      ? "Вы уверены, что хотите удалить список идей?"
      : "Вы уверены, что хотите удалить сценарий?";

  return {
    title,
    description,
  };
}
