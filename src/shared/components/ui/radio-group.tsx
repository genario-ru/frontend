import { Radio as RadioBase, type RadioRootProps } from "@base-ui/react/radio";
import {
  RadioGroup as RadioGroupBase,
  type RadioGroupProps,
} from "@base-ui/react/radio-group";

import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupBase
      className={cn("flex w-full flex-col gap-1", className)}
      {...props}
    />
  );
}

export function RadioGroupItem({
  className,
  children,
  ...props
}: RadioRootProps) {
  return (
    <RadioBase.Root
      className={cn(
        buttonVariants({ size: "sm", variant: "tertiary" }),
        "w-full justify-start px-2",
        className,
      )}
      {...props}
    >
      <RadioBase.Indicator
        keepMounted={true}
        className="before:bg-neutral-1 group data-checked:bg-neutral-8 bg-neutral-3 flex size-5 items-center justify-center rounded-full duration-200 before:size-2 before:rounded-full data-unchecked:before:hidden"
      />
      {children}
    </RadioBase.Root>
  );
}
