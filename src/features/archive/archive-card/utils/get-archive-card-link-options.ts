type GetArchiveCardLinkOptionsProps = {
  id: string;
  entity: "ideasList" | "scenario";
};

export function getArchiveCardLinkOptions({
  id,
  entity,
}: GetArchiveCardLinkOptionsProps) {
  if (entity === "ideasList") {
    return {
      to: "/ideas-lists/$ideasListId",
      params: {
        ideasListId: id,
      },
    };
  }

  return {
    to: "/scenarios/$scenarioId",
    params: {
      scenarioId: id,
    },
  };
}
