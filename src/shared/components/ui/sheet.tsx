import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const sheetContentVariants = cva(
  "fixed transition flex flex-col bg-neutral-2 ease-in-out data-[state=closed]:duration-200 data-[state=open]:duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top border-b",
        bottom:
          "inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom border-t",
        left: "inset-y-0 left-0 h-full data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left border-r",
        right:
          "inset-y-0 right-0 h-full data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right border-l",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

type SheetOverlayProps = ComponentProps<typeof SheetPrimitive.Overlay>;

type SheetContentProps = ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetContentVariants>;

type SheetHeaderProps = ComponentProps<"div">;

type SheetTitleProps = ComponentProps<typeof SheetPrimitive.Title>;

type SheetDescriptionProps = ComponentProps<typeof SheetPrimitive.Description>;

type SheetBodyProps = ComponentProps<"div">;

type SheetFooterProps = ComponentProps<"div">;

export const Sheet = SheetPrimitive.Root;

export const SheetTrigger = SheetPrimitive.Trigger;

export const SheetClose = SheetPrimitive.Close;

export const SheetPortal = SheetPrimitive.Portal;

export const SheetOverlay = ({
  ref,
  className,
  ...props
}: SheetOverlayProps) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "data-[state=open]:animate-in bg-neutral-7/30 dark:bg-neutral-1/60 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 backdrop-blur duration-200",
      className,
    )}
    {...props}
  />
);

export const SheetContent = ({
  ref,
  side = "left",
  className,
  children,
  ...props
}: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetContentVariants({ side }), className)}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
);

export const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-2 border-b p-4 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

export const SheetBody = ({ className, ...props }: SheetBodyProps) => (
  <div className={cn("flex w-full flex-col gap-4 p-4", className)} {...props} />
);

export const SheetTitle = ({ ref, className, ...props }: SheetTitleProps) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
);

export const SheetDescription = ({
  ref,
  className,
  ...props
}: SheetDescriptionProps) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-neutral-7 text-sm", className)}
    {...props}
  />
);

export const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
  <div
    className={cn(
      "mt-auto flex flex-col border-t p-4 sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
