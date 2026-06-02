import { EllipsisIcon, XIcon } from "lucide-react";
import { useState } from "react";

import type {
  SubscriptionExtendedSchemaStatusEnumKey,
  TariffExtendedSchemaBillingPeriodEnumKey,
} from "@/codegen/api/product";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { LDQUO, MDASH, NBSP, RDQUO } from "@/shared/constants/unicode";

import { billingPeriodSuffix } from "../constants/billing-period-suffix";
import { BillingMySubscriptionCardBadges } from "./billing-my-subscription-card-badges";

type BillingMySubscriptionCardProps = {
  name: string;
  price: number;
  billingPeriod: TariffExtendedSchemaBillingPeriodEnumKey | null;
  status: SubscriptionExtendedSchemaStatusEnumKey;
  credits: number | null;
  durationDays: number | null;
  dateRange: string;
  isCancellable: boolean;
  hideCancelAction?: boolean;
  onCancelButtonClick: () => void;
};

export function BillingMySubscriptionCard({
  name,
  price,
  billingPeriod,
  status,
  credits,
  durationDays,
  dateRange,
  isCancellable,
  hideCancelAction = false,
  onCancelButtonClick,
}: BillingMySubscriptionCardProps) {
  const suffix = billingPeriod ? billingPeriodSuffix[billingPeriod] : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-neutral-2 relative flex justify-between gap-4 rounded-2xl px-4 py-3">
      <div className="flex flex-col gap-2">
        <p className="font-medium">
          Тариф
          {NBSP}
          {LDQUO}
          {name}
          {RDQUO}
          {NBSP}
          {MDASH}
          {NBSP}
          {price === 0 ? "Бесплатно" : `${price.toLocaleString("ru-RU")} руб`}
          {suffix && (
            <span className="text-neutral-6 text-sm font-normal">{suffix}</span>
          )}
        </p>
        <BillingMySubscriptionCardBadges
          status={status}
          credits={credits}
          billingPeriod={billingPeriod}
          durationDays={durationDays}
          dateRange={dateRange}
        />
      </div>
      {isCancellable && !hideCancelAction && (
        <DropdownMenu
          modal={false}
          open={isMenuOpen}
          onOpenChange={setIsMenuOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button size="sm" icon={<EllipsisIcon />} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Button
                  size="sm"
                  priority="tertiary"
                  variant="negative"
                  rounding="base"
                  align="between"
                  icon={<XIcon />}
                  className="w-full"
                  onClick={onCancelButtonClick}
                >
                  Отменить
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
