import {
  Tabs as TabsBase,
  type TabsListProps,
  type TabsRootProps,
} from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const tabsUnderlineTriggerVariants = cva(
  cn(
    "group relative flex text-neutral-7 whitespace-nowrap items-center gap-2 duration-200",
    "focus-visible:ring-neutral-8 focus-visible:ring-2",
    "hover:text-neutral-8 active:text-neutral-8 data-active:text-neutral-8",
    "data-active:after:block data-active:after:bg-neutral-8 data-active:after:absolute data-active:after:inset-x-0 data-active:after:bottom-0 data-active:after:h-[3px] data-active:after:rounded-t-full",
  ),
  {
    variants: {
      size: {
        sm: "p-4 text-sm [&_svg]:size-5",
        base: "p-5 text-base [&_svg]:size-6",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

type TabsUnderlineTriggerProps = ComponentProps<typeof TabsBase.Tab> &
  VariantProps<typeof tabsUnderlineTriggerVariants>;

export function TabsUnderline({ className, ...props }: TabsRootProps) {
  return <TabsBase.Root className={cn("flex w-full", className)} {...props} />;
}

export function TabsUnderlineList({ className, ...props }: TabsListProps) {
  return <TabsBase.List className={cn("flex w-full", className)} {...props} />;
}

export function TabsUnderlineTrigger({
  size,
  className,
  ...props
}: TabsUnderlineTriggerProps) {
  return (
    <TabsBase.Tab
      className={cn(tabsUnderlineTriggerVariants({ size }), className)}
      {...props}
    />
  );
}
