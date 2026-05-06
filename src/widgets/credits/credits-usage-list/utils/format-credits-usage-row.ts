import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";
import type { LucideIcon } from "lucide-react";

import type { CreditsUsageExtendedSchema } from "@/codegen/api/product";

import { entityIconMap } from "../constants/entity-icon-map";
import { entityTitleMap } from "../constants/entity-title-map";

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
  icon: LucideIcon;
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
    title: entityTitleMap[usage.entity],
    icon: entityIconMap[usage.entity],
    creditsAmount: usage.creditsAmount,
    footerLeft: batchName,
    formattedDate: formatUsageDate(usage.createdAt),
  };
}
