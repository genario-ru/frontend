import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";

import type { CreditsUsageExtendedSchema } from "@/codegen/api/product";

const ENTITY_TITLE: Record<CreditsUsageExtendedSchema["entity"], string> = {
  "ideas-list": "Список идей",
  "scenario-chapters": "Сценарий",
  "scenario-chapter-scenes": "Сценарий",
  "scenario-scene-preview": "Превью сцены",
};

const ENTITY_SUBTITLE: Record<CreditsUsageExtendedSchema["entity"], string> = {
  "ideas-list": "Генерация контента списка идей",
  "scenario-chapters": "Работа с главами сценария",
  "scenario-chapter-scenes": "Работа со сценами",
  "scenario-scene-preview": "Генерация превью сцены",
};

function formatUsageDate(dateString: string): string {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Сегодня, ${format(date, "HH:mm:ss")}`;
  }
  if (isYesterday(date)) {
    return `Вчера, ${format(date, "HH:mm:ss")}`;
  }
  return format(date, "d MMMM yyyy, HH:mm:ss", { locale: ru });
}

export type CreditsUsageRowView = {
  id: string;
  entity: CreditsUsageExtendedSchema["entity"];
  title: string;
  subtitle: string;
  creditsAmount: number;
  footerLeft: string;
  formattedDate: string;
};

export function formatCreditsUsageRow(
  usage: CreditsUsageExtendedSchema,
): CreditsUsageRowView {
  const batchName = usage.batch.name;

  return {
    id: usage.id,
    entity: usage.entity,
    title: ENTITY_TITLE[usage.entity],
    subtitle: ENTITY_SUBTITLE[usage.entity],
    creditsAmount: usage.creditsAmount,
    footerLeft: batchName,
    formattedDate: formatUsageDate(usage.createdAt),
  };
}
