import * as Slot from "@radix-ui/react-slot";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";

import { underlineTabsTriggerClassName } from "@/shared/constants/underline-tab-variants";
import { cn } from "@/shared/utils/cn";

export const UnderlineTabsContent = TabsPrimitive.Content;

export const UnderlineTabs = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    className={cn("flex w-full flex-col gap-2", className)}
    {...props}
  />
);

export const UnderlineTabsList = ({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn("flex w-full gap-2 border-b", className)}
    {...props}
  />
);

export const UnderlineTabsTrigger = ({
  asChild = false,
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) => {
  const Comp = asChild ? Slot.Root : TabsPrimitive.Trigger;

  return (
    <Comp
      className={cn(
        underlineTabsTriggerClassName,
        "text-neutral-6 [&_svg]:stroke-neutral-6",
        "data-[state=inactive]:hover:text-neutral-7 data-[state=inactive]:active:text-neutral-7 data-[state=inactive]:hover:[&_svg]:stroke-neutral-7 data-[state=inactive]:active:[&_svg]:stroke-neutral-7",
        "data-[state=active]:after:bg-neutral-8 data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:bottom-0 data-[state=active]:after:block data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-t-full",
        "data-[state=active]:text-neutral-8 data-[state=active]:[&_svg]:stroke-neutral-8",
        "focus-visible:ring-neutral-8 focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  );
};
