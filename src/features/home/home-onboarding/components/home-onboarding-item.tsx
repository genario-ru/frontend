import { CheckIcon } from "lucide-react";
import { type ReactNode, useMemo } from "react";

import { Item } from "@/shared/components/ui/item";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { cn } from "@/shared/utils/cn";

import { HomeOnboardingItemIconLayout } from "./home-onboarding-item-icon-layout";

type HomeOnboardingItem = {
  position: number;
  title: string;
  description: string;
  status: "pending" | "completed" | "locked";
  action?: ReactNode;
};

export function HomeOnboardingItem({
  position,
  title,
  description,
  status,
  action,
}: HomeOnboardingItem) {
  const left = useMemo(() => {
    if (status === "completed") {
      return (
        <HomeOnboardingItemIconLayout className="bg-positive-5">
          <LucideIcon
            icon={CheckIcon}
            className="stroke-neutral-1 dark:stroke-neutral-8"
          />
        </HomeOnboardingItemIconLayout>
      );
    }

    return (
      <HomeOnboardingItemIconLayout
        className={cn({
          "bg-accent-5": status === "pending",
          "bg-neutral-3": status === "locked",
        })}
      >
        <p
          className={cn("text-lg font-semibold", {
            "text-neutral-1 dark:text-neutral-8": status === "pending",
            "text-neutral-5": status === "locked",
          })}
        >
          {position}
        </p>
      </HomeOnboardingItemIconLayout>
    );
  }, [position, status]);

  return (
    <Item left={left} title={title} description={description} bottom={action} />
  );
}

export function HomeOnboardingItemSkeleton() {
  return (
    <Item
      left={<Skeleton className="rounded-3 size-10 shrink-0" />}
      title={<TextSkeleton fontSize={16} lineHeight={24} className="w-3/4" />}
      description={
        <TextSkeleton fontSize={14} lineHeight={20} linesCount={2} />
      }
      className="w-full"
    />
  );
}
