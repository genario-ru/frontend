import type { CreditsUsageExtendedSchema } from "@/codegen/api/product";

type EntityTitleMap = Record<CreditsUsageExtendedSchema["entity"], string>;

export const entityTitleMap: EntityTitleMap = {
  "ideas-list": "Список идей",
  "scenario-chapters": "Глава сценария",
  "scenario-chapter-scene": "Сцена сценария",
  "scenario-chapter-scenes": "Сцена сценария",
  "scenario-scene-preview": "Превью сцены",
  "scenario-metadata": "Метаданные сценария",
  "scenario-metadata-item": "Метаданные платформы сценария",
};
