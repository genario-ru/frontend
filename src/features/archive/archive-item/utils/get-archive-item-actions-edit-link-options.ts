import type { LinkComponentProps } from "@tanstack/react-router";

type GetArchiveItemActionsEditLinkOptionsProps = {
  id: string;
  entity: "ideasList" | "scenario";
};

export function getArchiveItemActionsEditLinkOptions({
  id,
  entity,
}: GetArchiveItemActionsEditLinkOptionsProps): LinkComponentProps {
  if (entity === "ideasList") {
    return {
      to: "/ideas-lists/settings",
      search: {
        ideasListId: id,
      },
    };
  }

  return {
    to: "/scenarios/settings",
    search: {
      scenarioId: id,
    },
  };
}
