import { ReceiptIcon } from "lucide-react";

import type { PaymentExtendedSchemaStatusEnumKey } from "@/codegen/api/product";
import { Badge } from "@/shared/components/ui/badge";
import { LDQUO, RDQUO } from "@/shared/constants/unicode";
import { cn } from "@/shared/utils/cn";

import { operationIconColor } from "../constants/operation-icon-color";
import { operationStatusColor } from "../constants/operation-status-color";
import { operationStatusLabel } from "../constants/operation-status-label";

type BillingMyRecentOperationCardProps = {
  title: string;
  status: PaymentExtendedSchemaStatusEnumKey;
  tariffName: string | null;
  formattedAmount: string;
  formattedDate: string;
};

export function BillingMyRecentOperationCard({
  title,
  status,
  tariffName,
  formattedAmount,
  formattedDate,
}: BillingMyRecentOperationCardProps) {
  return (
    <div className="bg-neutral-2 flex items-center justify-between gap-4 rounded-2xl px-4 py-3">
      <div className="flex items-start gap-3">
        <ReceiptIcon
          className={cn("mt-0.5 h-4 w-4 shrink-0", operationIconColor[status])}
          strokeWidth={1.5}
        />
        <div className="flex flex-col gap-1.5">
          <span className="font-medium">{title}</span>
          <div className="flex flex-wrap items-center gap-2">
            <Badge color={operationStatusColor[status]} size="sm">
              {operationStatusLabel[status]}
            </Badge>
            {tariffName && (
              <Badge color="neutral" variant="secondary" size="sm">
                Тариф {LDQUO}
                {tariffName}
                {RDQUO}
              </Badge>
            )}
            <span className="text-neutral-6 text-xs">{formattedDate}</span>
          </div>
        </div>
      </div>
      <span className="text-neutral-8 shrink-0 font-semibold">
        {formattedAmount}
      </span>
    </div>
  );
}
