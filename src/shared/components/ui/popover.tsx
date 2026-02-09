import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentProps, RefObject } from "react";

import { cn } from "@/shared/utils/cn";

type PopoverContentProps = ComponentProps<typeof PopoverPrimitive.Content> & {
  portalContainerRef?: RefObject<HTMLDivElement | null>;
};

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverAnchor = PopoverPrimitive.Anchor;

export const PopoverContent = ({
  portalContainerRef,
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: PopoverContentProps) => (
  <PopoverPrimitive.Portal container={portalContainerRef?.current}>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "bg-neutral-1 border-neutral-2 overflow-hidden rounded-2xl border p-4 shadow-xl outline-none",
        "w-(--radix-popover-trigger-width) origin-(--radix-popover-content-transform-origin)",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
