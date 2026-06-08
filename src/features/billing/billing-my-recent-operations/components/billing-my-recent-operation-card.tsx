import { ArrowUpRightIcon, ReceiptIcon } from "lucide-react";

import type { PaymentExtendedSchemaStatusEnumKey } from "@/codegen/api/product";
import { Badge } from "@/shared/components/ui/badge";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { buttonVariants } from "@/shared/constants/button-variants";
import { LDQUO, RDQUO } from "@/shared/constants/unicode";
import { cn } from "@/shared/utils/cn";

import { operationIconColor } from "../constants/operation-icon-color";
import { operationStatusColor } from "../constants/operation-status-color";
import { operationStatusLabel } from "../constants/operation-status-label";
import { operationStatusVariant } from "../constants/operation-status-variant";

type BillingMyRecentOperationCardProps = {
  title: string;
  status: PaymentExtendedSchemaStatusEnumKey;
  tariffName: string | null;
  formattedAmount: string;
  formattedDate: string;
  paymentLink: string | null;
};

export function BillingMyRecentOperationCard({
  title,
  status,
  tariffName,
  formattedAmount,
  formattedDate,
  paymentLink,
}: BillingMyRecentOperationCardProps) {
  return (
    <div className="bg-neutral-2 flex justify-between gap-4 rounded-2xl px-4 py-3">
      <div className="flex h-full flex-col justify-between gap-2">
        <div className="flex items-center gap-2">
          <LucideIcon
            icon={ReceiptIcon}
            className={cn(operationIconColor[status])}
          />
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge
            color={operationStatusColor[status]}
            variant={operationStatusVariant[status]}
            size="sm"
          >
            {operationStatusLabel[status]}
          </Badge>
          {tariffName && (
            <Badge color="neutral" variant="tertiary" size="sm">
              Тариф {LDQUO}
              {tariffName}
              {RDQUO}
            </Badge>
          )}
          <Badge color="neutral" variant="tertiary" size="sm">
            {formattedDate}
          </Badge>
        </div>
      </div>
      <div className="flex h-full flex-col items-end justify-between gap-2">
        <span className="text-neutral-8 shrink-0 font-semibold">
          {formattedAmount}
        </span>
        {paymentLink && status === "pending" && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={paymentLink}
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-neutral-3 hover:bg-neutral-4 active:bg-neutral-4",
            )}
          >
            К платежу
            <ArrowUpRightIcon />
          </a>
        )}
      </div>
    </div>
  );
}
