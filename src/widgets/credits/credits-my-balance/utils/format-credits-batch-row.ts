import { format } from "date-fns";

import type { CreditsBatchExtendedSchema } from "@/codegen/api/product";

import { resolveCreditsBatchTotal } from "./resolve-credits-batch-total";

export type CreditsBatchRowView = {
  id: string;
  label: string;
  remaining: number;
  total: number;
  rightCaption: string;
};

export function formatCreditsBatchRow(
  batch: CreditsBatchExtendedSchema,
): CreditsBatchRowView {
  const total = resolveCreditsBatchTotal(batch);

  const remaining = batch.remainingAmount;
  const ratio = `${remaining.toLocaleString("ru-RU")}/${total.toLocaleString("ru-RU")}`;

  const expiresPart = batch.expiresAt
    ? ` до ${format(batch.expiresAt, "dd.MM.yy")}`
    : "";

  return {
    id: batch.id,
    label: batch.name,
    remaining,
    total,
    rightCaption: `${ratio}${expiresPart}`,
  };
}
