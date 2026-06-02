import {
  CreditCardIcon,
  EllipsisIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

import type { PaymentMethodSchema } from "@/codegen/api/product";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

type BillingMyPaymentMethodCardProps = {
  paymentMethod: PaymentMethodSchema;
  isDeletePending: boolean;
  hideDropdownAction?: boolean;
  onDelete: () => void;
  onMakeDefault: () => void;
};

export function BillingMyPaymentMethodCard({
  paymentMethod,
  isDeletePending,
  hideDropdownAction = false,
  onDelete,
  onMakeDefault,
}: BillingMyPaymentMethodCardProps) {
  const label = paymentMethod.title ?? paymentMethod.type;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-neutral-2 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-3">
        <LucideIcon icon={CreditCardIcon} />
        <span className="font-medium">{label}</span>
      </div>
      {!hideDropdownAction && (
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
                  rounding="base"
                  align="between"
                  icon={<StarIcon />}
                  className="w-full"
                  onClick={onMakeDefault}
                >
                  Сделать основным
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  size="sm"
                  priority="tertiary"
                  variant="negative"
                  rounding="base"
                  align="between"
                  icon={<Trash2Icon />}
                  state={isDeletePending ? "loading" : "default"}
                  className="w-full"
                  onClick={onDelete}
                >
                  Удалить
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
