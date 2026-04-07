import type { ReactNode } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/cn";

type CreditsUsageRowProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  creditsAmount: number;
  footerLeft: string;
  formattedDate: string;
  className?: string;
};

export function CreditsUsageRow({
  icon,
  title,
  subtitle,
  creditsAmount,
  footerLeft,
  formattedDate,
  className,
}: CreditsUsageRowProps) {
  const amountLabel = `-${Math.abs(creditsAmount).toLocaleString("ru-RU")}`;

  return (
    <div
      className={cn(
        "bg-neutral-1 border-neutral-3 flex flex-col gap-2 rounded-2xl border px-4 py-3",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="bg-neutral-2 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
            {icon}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold">{title}</span>
            <span className="text-neutral-6 text-sm">{subtitle}</span>
          </div>
        </div>
        <Badge
          color="neutral"
          variant="secondary"
          size="sm"
          className="shrink-0"
        >
          {amountLabel}
        </Badge>
      </div>
      <p className="text-neutral-6 pl-12 text-xs">
        {footerLeft}
        <span className="mx-2">·</span>
        {formattedDate}
      </p>
    </div>
  );
}
