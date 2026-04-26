import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

import { Button, type ButtonProps } from "./button";
import { Heading, type HeadingProps } from "./heading";

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  overlayProps?: ComponentProps<typeof DialogPrimitive.Overlay>;
  ignoreParentLink?: boolean;
};

type DialogPredefinedHeaderProps = HTMLAttributes<HTMLElement> & {
  title: ReactNode;
  description?: ReactNode;
  hasCloseButton?: boolean;
  closeButtonProps?: ButtonProps;
  headerContentProps?: HTMLAttributes<HTMLElement>;
};

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogPortal = DialogPrimitive.Portal;

export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "bg-neutral-7/30 dark:bg-neutral-3/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto p-10 backdrop-blur duration-200",
        className,
      )}
      {...props}
    />
  );
}

export function DialogContent({
  overlayProps,
  className,
  children,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay data-ignore-parent-link {...overlayProps}>
        <DialogPrimitive.Content
          onPointerDownOutside={(e) => {
            const currentTarget = e.currentTarget as HTMLElement;

            if (e.detail.originalEvent.offsetX > currentTarget.clientWidth) {
              e.preventDefault();
            }
          }}
          className={cn(
            "bg-neutral-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98] isolate m-auto flex w-full max-w-lg flex-col rounded-3xl duration-200",
            className,
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
}

export function DialogCloseButton(props: ButtonProps) {
  return (
    <DialogClose asChild>
      <Button priority="tertiary" icon={<XIcon />} {...props} />
    </DialogClose>
  );
}

export function DialogHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <header {...props} />;
}

export function DialogBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex w-full flex-col gap-4 p-4", className)}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      className={cn(
        "bg-neutral-1 flex w-full justify-between gap-4 rounded-b-3xl p-4",
        className,
      )}
      {...props}
    />
  );
}

export function DialogTitle({
  variant,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title> &
  Pick<HeadingProps, "variant">) {
  return (
    <DialogPrimitive.Title {...props} asChild>
      <Heading as="h1" variant={variant ?? "h2"}>
        {children}
      </Heading>
    </DialogPrimitive.Title>
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-neutral-7 w-fit text-left", className)}
      {...props}
    />
  );
}

export function DialogPredefinedHeader({
  title,
  description,
  hasCloseButton = true,
  closeButtonProps = {},
  headerContentProps = {},
  className,
  ...props
}: DialogPredefinedHeaderProps) {
  const { className: closeButtonClassName, ...restCloseButtonProps } =
    closeButtonProps;

  const { className: headerContentClassName, ...restHeaderContentProps } =
    headerContentProps;

  return (
    <DialogHeader
      className={cn("flex w-full justify-between gap-4 px-4 pt-4", className)}
      {...props}
    >
      <div
        className={cn("flex flex-col gap-1", headerContentClassName)}
        {...restHeaderContentProps}
      >
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </div>
      {hasCloseButton && (
        <DialogCloseButton
          className={cn("relative -top-1.5 -right-1.5", closeButtonClassName)}
          {...restCloseButtonProps}
        />
      )}
    </DialogHeader>
  );
}
