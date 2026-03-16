import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CircleIcon } from "lucide-react";
import { type ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { Separator } from "./separator";

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuItem = DropdownMenuPrimitive.Item;

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuSubContent = ({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent
      sideOffset={sideOffset}
      className={cn(
        "bg-neutral-1 border-neutral-2 rounded-3.5 shadow-bottom-2 flex min-w-40 flex-col overflow-x-hidden overflow-y-auto border",
        "max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin)",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        "bg-neutral-1 border-neutral-2 rounded-3.5 shadow-bottom-2 flex min-w-40 flex-col overflow-x-hidden overflow-y-auto border",
        "max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin)",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuGroup = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Group>) => (
  <DropdownMenuPrimitive.Group
    className={cn("flex flex-col p-1", className)}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Group>
);

export const DropdownMenuRadioItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "focus:bg-neutral-1 flex cursor-default items-center rounded-lg px-3 py-2 pl-7 text-sm font-medium outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CircleIcon className="fill-neutral-8 stroke-neutral-8 h-2 w-2" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      "px-2 py-1.5 text-sm font-medium",
      {
        "pl-8": inset,
      },
      className,
    )}
    {...props}
  />
);

export const DropdownMenuSeparator = Separator;
