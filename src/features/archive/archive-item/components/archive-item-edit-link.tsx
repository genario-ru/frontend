import { PencilIcon } from "lucide-react";

import { getArchiveItemActionsEditLinkOptions } from "../utils/get-archive-item-actions-edit-link-options";
import { ArchiveItemActionsButtonLink } from "./archive-item-actions-button-link";

type ArchiveItemEditLinkProps = {
  id: string;
  entity: "ideasList" | "scenario";
};

export function ArchiveItemEditLink({ id, entity }: ArchiveItemEditLinkProps) {
  return (
    <ArchiveItemActionsButtonLink
      {...getArchiveItemActionsEditLinkOptions({ id, entity })}
      icon={<PencilIcon />}
    >
      Редактировать
    </ArchiveItemActionsButtonLink>
  );
}
