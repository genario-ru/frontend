import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const tooltipContentVariants = cva(
  "bg-neutral-12 text-neutral-1 max-w-80 overflow-hidden border font-medium animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 origin-(--radix-tooltip-content-transform-origin)",
  {
    variants: {
      size: {
        base: "text-sm px-2 py-1 rounded-lg shadow-xs",
        lg: "px-3 py-2 rounded-xl shadow-sm",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

type TooltipContentProps = ComponentProps<typeof TooltipPrimitive.Content> &
  VariantProps<typeof tooltipContentVariants>;

export const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) => {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
};

export const Tooltip = ({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Root>) => {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
};

export const TooltipTrigger = ({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
};

export const TooltipContent = ({
  ref,
  size,
  className,
  sideOffset = 6,
  ...props
}: TooltipContentProps) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants({ size }), className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
);
