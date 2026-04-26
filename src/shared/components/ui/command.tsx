import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, SearchIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";

import { Checkbox } from "./checkbox";
import { LucideIcon } from "./lucide-icon";
import { Spinner } from "./spinner";
import { TextSkeleton } from "./text-skeleton";

type CommandInputProps = ComponentProps<typeof CommandPrimitive.Input> & {
  isLoading?: boolean;
};

type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item> & {
  isActive?: boolean;
};

export const Command = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn("flex h-full w-full flex-col font-medium", className)}
    {...props}
  />
);

export const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

export const CommandInput = ({
  isLoading,
  className,
  ...props
}: CommandInputProps) => (
  <div
    // eslint-disable-next-line react/no-unknown-property
    cmdk-input-wrapper=""
    className={cn("mx-3 flex items-center gap-2 border-b", className)}
  >
    {isLoading ? <Spinner /> : <LucideIcon icon={SearchIcon} size="sm" />}
    <CommandPrimitive.Input
      className="placeholder:text-neutral-6 flex h-12 w-full bg-transparent py-3 outline-none disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  </div>
);

export const CommandList = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List
    className={cn(
      "max-h-56 w-full overflow-x-hidden overflow-y-auto outline-none",
      className,
    )}
    {...props}
  />
);

export const CommandEmpty = (
  props: ComponentProps<typeof CommandPrimitive.Empty>,
) => <CommandPrimitive.Empty className="py-4 text-center" {...props} />;

export const CommandItemsLoading = () => (
  <div className="flex w-full flex-col gap-1">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton
        key={`cmdk-group-item-skeleton-${index}`}
        className="h-9 w-full rounded-lg"
      />
    ))}
  </div>
);

export const CommandLoading = (
  props: ComponentProps<typeof CommandPrimitive.Loading>,
) => (
  <CommandPrimitive.Loading {...props}>
    {Array.from({ length: 2 }).map((_, index) => (
      <div
        key={`cmdk-group-item-skeleton-${index}`}
        className="flex flex-col p-1.5"
      >
        <TextSkeleton
          fontSize={14}
          lineHeight={20}
          lineClassName="w-40"
          className="px-2 py-1.5"
        />
        <CommandItemsLoading />
      </div>
    ))}
  </CommandPrimitive.Loading>
);

export const CommandGroup = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    className={cn(
      "**:[[cmdk-group-heading]]:text-neutral-7 overflow-hidden p-1.5 outline-none **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-items]]:flex **:[[cmdk-group-items]]:flex-col **:[[cmdk-group-items]]:gap-1",
      className,
    )}
    {...props}
  />
);

export const CommandSeparator = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator
    className={cn("bg-neutral-5 h-px", className)}
    {...props}
  />
);

const commandItemClassName = ({
  active,
  className,
}: {
  active?: boolean;
  className?: string;
}) =>
  cn(
    "flex cursor-default items-center gap-2 rounded-xl px-3 py-2 outline-none select-none",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
    {
      "data-[selected=true]:bg-neutral-2": !active,
      "bg-neutral-2 data-[selected=true]:bg-neutral-3": active,
    },
    className,
  );

export const CommandItem = ({
  isActive,
  children,
  className,
  ...props
}: CommandItemProps) => (
  <CommandPrimitive.Item
    className={cn(
      commandItemClassName({ active: isActive, className }),
      "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
    )}
    {...props}
  >
    {children}
    <CheckIcon
      className={cn("stroke-neutral-8 ml-auto opacity-0", {
        "opacity-100": isActive,
      })}
    />
  </CommandPrimitive.Item>
);

export const CommandMultiselectItem = ({
  isActive,
  children,
  className,
  ...props
}: CommandItemProps) => (
  <CommandPrimitive.Item
    className={commandItemClassName({
      active: isActive,
      className,
    })}
    {...props}
  >
    <Checkbox checked={isActive} />
    {children}
  </CommandPrimitive.Item>
);

export const CommandShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("text-neutral-6 ml-auto text-xs", className)}
      {...props}
    />
  );
};
