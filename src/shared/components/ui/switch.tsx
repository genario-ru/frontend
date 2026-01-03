"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const Switch = ({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) => {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent transition-all duration-200 outline-none",
        "data-[state=unchecked]:hover:bg-neutral-6 data-[state=unchecked]:bg-neutral-5",
        "data-[state=checked]:bg-neutral-8",
        "focus-visible:border-neutral-6 focus-visible:ring-neutral-8 focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-neutral-1 pointer-events-none block size-4.5 rounded-full shadow-xs ring-0 transition-transform",
          "data-[state=checked]:translate-x-[130%] data-[state=unchecked]:translate-x-1",
        )}
      />
    </SwitchPrimitive.Root>
  );
};
