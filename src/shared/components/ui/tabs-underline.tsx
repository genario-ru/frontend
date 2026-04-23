import { Tabs as TabsBase } from "@base-ui/react/tabs";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type TabsUnderlineProps = ComponentProps<typeof TabsBase.Root>;

type TabsUnderlineListProps = ComponentProps<typeof TabsBase.List>;

type TabsUnderlineTriggerProps = ComponentProps<typeof TabsBase.Tab>;

export function TabsUnderline({ className, ...props }: TabsUnderlineProps) {
  return <TabsBase.Root className={cn("flex", className)} {...props} />;
}

export function TabsUnderlineList({
  className,
  ...props
}: TabsUnderlineListProps) {
  return <TabsBase.List className={cn("flex", className)} {...props} />;
}

export function TabsUnderlineTrigger({
  className,
  ...props
}: TabsUnderlineTriggerProps) {
  return (
    <TabsBase.Tab
      className={cn(
        "group text-neutral-7 focus-visible:ring-neutral-8 hover:text-neutral-8 active:text-neutral-8 data-active:text-neutral-8 data-active:after:bg-neutral-8 relative flex h-16 items-center gap-2 px-4 text-base whitespace-nowrap duration-200 focus-visible:ring-2 data-active:after:absolute data-active:after:inset-x-0 data-active:after:bottom-0 data-active:after:block data-active:after:h-[3px] data-active:after:rounded-t-full [&_svg]:size-6",
        className,
      )}
      {...props}
    />
  );
}
