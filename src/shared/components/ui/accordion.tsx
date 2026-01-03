import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { Checkbox } from "./checkbox";

export const Accordion = ({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) => (
  <AccordionPrimitive.Root
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
);

export const AccordionItem = ({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item
    className={cn("bg-neutral-1 overflow-hidden rounded-2xl border", className)}
    {...props}
  />
);

export const AccordionHeader = ({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Header>) => (
  <AccordionPrimitive.Header className={cn("flex", className)} {...props} />
);

export const AccordionCheckbox = ({
  id,
  className,
  ...props
}: ComponentProps<typeof Checkbox>) => (
  <label
    htmlFor={id}
    className={cn(
      "hover:bg-neutral-2 flex items-center justify-center p-3",
      className,
    )}
  >
    <Checkbox id={id} {...props} />
  </label>
);

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Trigger
    className={cn(
      "focus-visible:bg-neutral-2 hover:bg-neutral-2 flex flex-1 items-center justify-between py-3 pr-3 text-left text-sm font-medium outline-none [&[data-state=open]>svg]:rotate-180",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown className="text-neutral-7 h-4 w-4 shrink-0" />
  </AccordionPrimitive.Trigger>
);

export const AccordionContent = ({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    className={cn("overflow-hidden border-t p-3 text-sm", className)}
    {...props}
  />
);
