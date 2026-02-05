import type { LinkComponentProps } from "@tanstack/react-router";

type GetArchiveItemLinkOptionsProps = {
  id: string;
  entity: "ideasList" | "scenario";
};

export function getArchiveItemLinkOptions({
  id,
  entity,
}: GetArchiveItemLinkOptionsProps): LinkComponentProps {
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
