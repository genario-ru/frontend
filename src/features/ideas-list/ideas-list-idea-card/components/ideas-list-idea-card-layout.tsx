import { FlameIcon, ScrollTextIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/shared/components/ui/card";
import { Heading } from "@/shared/components/ui/heading";
import { Island } from "@/shared/components/ui/island";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";

type IdeasListIdeaCardLayoutProps = PropsWithClassName<{
  name?: string | null;
  description?: string | null;
  reason?: string | null;
  secondaryActions?: ReactNode;
  primaryActions: ReactNode;
}>;

export function IdeasListIdeaCardLayout({
  name,
  description,
  reason,
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
      {description && (
        <Card
          title="Описание"
          headerIcon={<LucideIcon icon={ScrollTextIcon} className="size-5" />}
          className="flex-1"
        >
          {description}
        </Card>
      )}
      {reason && (
        <Card
          title="Почему зайдет"
          headerIcon={
            <LucideIcon icon={FlameIcon} className="size-5 stroke-orange-500" />
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
