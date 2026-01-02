"use client";

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
      "data-[state=inactive]:text-new-neutral-7",
      "data-[state=inactive]:hover:bg-new-neutral-2 data-[state=inactive]:active:bg-new-neutral-2 data-[state=inactive]:hover:text-new-neutral-8 data-[state=inactive]:active:text-new-neutral-8",
      "data-[state=active]:text-new-neutral-8 data-[state=active]:bg-new-neutral-2",
      className,
    )}
    {...props}
  />
);
