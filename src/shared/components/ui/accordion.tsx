import {
  Accordion as AccordionBase,
  type AccordionItemProps,
  type AccordionPanelProps,
  type AccordionRootProps,
  type AccordionTriggerProps,
} from "@base-ui/react/accordion";
import { MinusIcon, PlusIcon } from "lucide-react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon } from "./lucide-icon";

export const Accordion = ({ className, ...props }: AccordionRootProps) => {
  return (
    <AccordionBase.Root
      className={cn("bg-neutral-2 flex w-full flex-col rounded-2xl", className)}
      {...props}
    />
  );
};

export const AccordionItem = ({ className, ...props }: AccordionItemProps) => {
  return (
    <AccordionBase.Item
      className={cn("flex flex-col overflow-hidden", className)}
      {...props}
    />
  );
};

export const AccordionHeader = AccordionBase.Header;

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => {
  return (
    <AccordionBase.Trigger
      className={cn(
        "group flex justify-between gap-1 p-4 text-lg font-medium data-panel-open:pb-0",
        className,
      )}
      {...props}
    >
      {children}
      <div className="shrink-0">
        <LucideIcon icon={PlusIcon} className="group-data-panel-open:hidden" />
        <LucideIcon
          icon={MinusIcon}
          className="hidden group-data-panel-open:block"
        />
      </div>
    </AccordionBase.Trigger>
  );
};

export const AccordionPanel = ({
  className,
  ...props
}: AccordionPanelProps) => {
  return (
    <AccordionBase.Panel
      className={cn(
        "text-neutral-7 flex flex-col gap-1.5 overflow-hidden px-4 pb-4 data-open:pt-2",
        className,
      )}
      {...props}
    />
  );
};
