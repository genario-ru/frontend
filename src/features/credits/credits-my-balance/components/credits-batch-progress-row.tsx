import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/utils/cn";

type CreditsBatchProgressRowProps = {
  label: string;
  remaining: number;
  total: number;
  rightCaption: string | null;
  className?: string;
};

export function CreditsBatchProgressRow({
  label,
  remaining,
  total,
  rightCaption,
  className,
}: CreditsBatchProgressRowProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start justify-between gap-3">
        <span className="font-medium">{label}</span>
        {rightCaption && (
          <span className="text-neutral-6 shrink-0 text-right text-sm whitespace-nowrap">
            {rightCaption}
          </span>
        )}
      </div>
      <Progress value={remaining} max={total} className="h-2.5" />
    </div>
  );
}
