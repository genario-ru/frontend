import type { LucideIcon } from "lucide-react";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { cn } from "@/shared/utils/cn";

type InfoItemProps = {
  Icon: LucideIcon;
  iconClassName?: string;
  label: string;
};

export const InfoItemSkeleton = () => (
  <div className="flex items-center gap-1.5">
    <Skeleton className="h-4 w-4 rounded-full" />
    <TextSkeleton
      fontSize={14}
      lineHeight={20}
      linesCount={1}
      className="w-20"
    />
  </div>
);

export const InfoItem = ({ Icon, iconClassName, label }: InfoItemProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Icon
        className={cn("stroke-neutral-8 size-4 shrink-0", iconClassName)}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
};
