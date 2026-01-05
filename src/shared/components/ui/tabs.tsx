import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";

import { tabsTriggerBasicClassName } from "@/shared/constants/tabs-trigger-variants";
import { cn } from "@/shared/utils/cn";

export const Tabs = TabsPrimitive.Root;

export const TabsContent = TabsPrimitive.Content;

export const TabsList = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn("flex h-fit w-fit gap-2", className)}
    {...props}
  />
);

export const TabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      tabsTriggerBasicClassName,
      "data-[state=inactive]:text-neutral-7",
      "data-[state=inactive]:hover:bg-neutral-2 data-[state=inactive]:active:bg-neutral-2 data-[state=inactive]:hover:text-neutral-8 data-[state=inactive]:active:text-neutral-8",
      "data-[state=active]:text-neutral-8 data-[state=active]:bg-neutral-2",
      className,
    )}
    {...props}
  />
);
