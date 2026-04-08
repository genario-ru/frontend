import {
  ClapperboardIcon,
  ImageIcon,
  LightbulbIcon,
  ScrollTextIcon,
} from "lucide-react";

import type { CreditsUsageExtendedSchema } from "@/codegen/api/product";

type CreditsUsageEntityIconProps = {
  entity: CreditsUsageExtendedSchema["entity"];
};

export function CreditsUsageEntityIcon({
  entity,
}: CreditsUsageEntityIconProps) {
  const className = "text-neutral-7 h-4 w-4";

  switch (entity) {
    case "ideas-list":
      return <LightbulbIcon className={className} strokeWidth={1.5} />;
    case "scenario-chapters":
      return <ScrollTextIcon className={className} strokeWidth={1.5} />;
    case "scenario-chapter-scenes":
      return <ClapperboardIcon className={className} strokeWidth={1.5} />;
    case "scenario-scene-preview":
      return <ImageIcon className={className} strokeWidth={1.5} />;
    default:
      return <LightbulbIcon className={className} strokeWidth={1.5} />;
  }
}
