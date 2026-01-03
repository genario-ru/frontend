"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon, CircleIcon } from "lucide-react";
import { type ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { Separator } from "./separator";

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      "focus:bg-neutral-1 data-[state=open]:bg-neutral-1 flex items-center gap-2 rounded-lg p-1.5 text-sm font-medium outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-7",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon size={16} className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
);

export const DropdownMenuSubContent = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      "bg-neutral-1 min-w-32 overflow-hidden rounded-xl p-1 shadow-sm",
      "origin-(--radix-dropdown-menu-content-transform-origin)",
      className,
    )}
    {...props}
  />
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
        "bg-neutral-1 rounded-3.5 flex min-w-40 flex-col overflow-x-hidden overflow-y-auto shadow-[0_4px_10px_0_rgba(0,0,0,0.15)]",
        "max-h-[var(--radix-dropdown-menu-content-available-height)] origin-(--radix-dropdown-menu-content-transform-origin)",
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

export const DropdownMenuItem = ({
  className,
  inset,
  unstyled = false,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  unstyled?: boolean;
}) => (
  <DropdownMenuPrimitive.Item
    className={
      !unstyled
        ? cn(
            "focus:bg-neutral-1 rounded-2.5 flex h-8 items-center gap-1.5 px-2 text-sm font-medium select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0",
            inset && "pl-8",
            className,
          )
        : ""
    }
    {...props}
  />
);

export const DropdownMenuRadioItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "focus:bg-neutral-1 flex cursor-default items-center rounded-lg px-3 py-2 pl-7 text-sm font-medium outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0",
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
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);

export const DropdownMenuSeparator = Separator;
