import {
  AnchorIcon,
  FlameIcon,
  GaugeIcon,
  ScrollTextIcon,
  TrendingUpIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/shared/components/ui/card";
import { Heading } from "@/shared/components/ui/heading";
import { Island } from "@/shared/components/ui/island";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { ScoreIndicator } from "@/shared/components/ui/score-indicator";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";

const SCORE_MAX = 5;

type IdeasListIdeaCardLayoutProps = PropsWithClassName<{
  name?: string | null;
  description?: string | null;
  reason?: string | null;
  hook?: string | null;
  potential: number;
  complexity: number;
  secondaryActions?: ReactNode;
  primaryActions: ReactNode;
}>;

export function IdeasListIdeaCardLayout({
  name,
  description,
  reason,
  hook,
  potential,
  complexity,
  secondaryActions,
  primaryActions,
  className,
}: IdeasListIdeaCardLayoutProps) {
  const computedName = name ?? "Без названия";

  return (
    <Island className={className}>
      <header className="flex justify-between gap-4">
        <Heading variant="h2">{computedName}</Heading>
        {secondaryActions}
      </header>
      <div className="grid grid-cols-2 gap-2 empty:hidden">
        {potential > 0 && (
          <Card
            title="Потенциал"
            headerIcon={
              <LucideIcon
                icon={TrendingUpIcon}
                className="stroke-positive-5 size-5"
              />
            }
          >
            <ScoreIndicator value={potential} max={SCORE_MAX} inverted />
          </Card>
        )}
        {complexity > 0 && (
          <Card
            title="Сложность"
            headerIcon={
              <LucideIcon
                icon={GaugeIcon}
                className="stroke-negative-5 size-5"
              />
            }
          >
            <ScoreIndicator value={complexity} max={SCORE_MAX} />
          </Card>
        )}
      </div>
      {hook && (
        <Card
          title="Хук"
          headerIcon={<LucideIcon size="sm" icon={AnchorIcon} />}
        >
          {hook}
        </Card>
      )}
      {description && (
        <Card
          title="Описание"
          headerIcon={<LucideIcon size="sm" icon={ScrollTextIcon} />}
          className="flex-1"
        >
          {description}
        </Card>
      )}
      {reason && (
        <Card
          title="Почему зайдет"
          headerIcon={
            <LucideIcon
              size="sm"
              icon={FlameIcon}
              className="stroke-orange-500"
            />
          }
        >
          {reason}
        </Card>
      )}
      {primaryActions}
    </Island>
  );
}

export function IdeasListIdeaCardLayoutSkeleton() {
  return (
    <Island>
      <header className="flex justify-between gap-4">
        <TextSkeleton fontSize={20} lineHeight={28} className="h-8 w-40" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </header>
      <div className="grid grid-cols-2 gap-2">
        <Card
          title="Потенциал"
          headerIcon={
            <LucideIcon
              icon={TrendingUpIcon}
              className="stroke-positive-5 size-5"
            />
          }
        >
          <Skeleton className="h-8 w-full rounded-lg" />
        </Card>
        <Card
          title="Сложность"
          headerIcon={<LucideIcon icon={GaugeIcon} className="size-5" />}
        >
          <Skeleton className="h-8 w-full rounded-lg" />
        </Card>
      </div>
      <Card
        title="Хук"
        headerIcon={<LucideIcon icon={AnchorIcon} className="size-5" />}
      >
        <TextSkeleton fontSize={14} lineHeight={20} linesCount={2} />
      </Card>
      <Card
        title="Описание"
        headerIcon={<LucideIcon icon={ScrollTextIcon} className="size-5" />}
      >
        <TextSkeleton fontSize={14} lineHeight={20} linesCount={10} />
      </Card>
      <Card
        title="Почему зайдет"
        headerIcon={
          <LucideIcon icon={FlameIcon} className="size-5 stroke-orange-500" />
        }
      >
        <TextSkeleton fontSize={14} lineHeight={20} linesCount={4} />
      </Card>
      <div className="flex items-center justify-end">
        <Skeleton className="h-8 w-32 rounded-full" />
      </div>
    </Island>
  );
}
