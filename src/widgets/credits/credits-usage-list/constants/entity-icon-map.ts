import {
  ClapperboardIcon,
  FileIcon,
  ImageIcon,
  LightbulbIcon,
  type LucideIcon,
  ScrollTextIcon,
} from "lucide-react";

import type { CreditsUsageExtendedSchema } from "@/codegen/api/product";

type EntityIconMap = Record<CreditsUsageExtendedSchema["entity"], LucideIcon>;

export const entityIconMap: EntityIconMap = {
  "ideas-list": LightbulbIcon,
  "scenario-chapters": ScrollTextIcon,
  "scenario-chapter-scenes": ClapperboardIcon,
  "scenario-scene-preview": ImageIcon,
  "scenario-metadata": FileIcon,
  "scenario-metadata-item": FileIcon,
};
