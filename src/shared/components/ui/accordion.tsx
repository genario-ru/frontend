import {
  Accordion as AccordionBase,
  type AccordionItemProps,
  type AccordionPanelProps,
  type AccordionRootProps,
  type AccordionTriggerProps,
} from "@base-ui/react/accordion";

import { cn } from "@/shared/utils/cn";

export const Accordion = ({ className, ...props }: AccordionRootProps) => {
  return (
    <AccordionBase.Root
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
};

export const AccordionItem = ({ className, ...props }: AccordionItemProps) => {
  return (
    <AccordionBase.Item
      className={cn(
        "bg-neutral-2 flex flex-col overflow-hidden rounded-2xl",
        className,
      )}
      {...props}
    />
  );
};

export const AccordionHeader = AccordionBase.Header;

export const AccordionTrigger = ({
  className,
  ...props
}: AccordionTriggerProps) => {
  return (
    <AccordionBase.Trigger
      className={cn("flex flex-col gap-1 p-4 data-panel-open:pb-0", className)}
      {...props}
    />
  );
};

export const AccordionPanel = ({
  className,
  ...props
}: AccordionPanelProps) => {
  return (
    <AccordionBase.Panel
      className={cn(
        "flex flex-col gap-1.5 overflow-hidden px-4 pb-4 data-open:pt-4",
        className,
      )}
      {...props}
    />
  );
};
