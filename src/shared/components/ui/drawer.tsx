import { Drawer as DrawerBase } from "@base-ui/react/drawer";
import { XIcon } from "lucide-react";
import { type PropsWithChildren, type ReactNode, useMemo } from "react";

import { cn } from "@/shared/utils/cn";

import { Button } from "./button";
import { Island, type IslandProps } from "./island";

type DrawerHeaderProps = IslandProps & {
  title?: string;
  description?: string;
  left?: ReactNode;
  right?: ReactNode;
};

type DrawerSectionProps = IslandProps & {
  title?: string;
};

type DrawerContentProps = PropsWithChildren;

export const Drawer = DrawerBase.Root;
export const DrawerTrigger = DrawerBase.Trigger;
export const DrawerClose = DrawerBase.Close;
export const DrawerTitle = DrawerBase.Title;
export const DrawerDescription = DrawerBase.Description;

export function DrawerHeader({
  title = "Без названия",
  description,
  left: leftProp,
  right: rightProp,
  className,
  ...props
}: DrawerHeaderProps) {
  const hasDescription = Boolean(description);

  const left = useMemo(() => {
    if (leftProp) return leftProp;

    return (
      <div className="flex flex-col gap-1">
        <DrawerBase.Title className="text-xl font-semibold">
          {title}
        </DrawerBase.Title>
        {description && (
          <DrawerBase.Description className="text-neutral-7">
            {description}
          </DrawerBase.Description>
        )}
      </div>
    );
  }, [title, description, leftProp]);

  const right = useMemo(() => {
    if (rightProp) return rightProp;

    return (
      <DrawerBase.Close
        render={<Button priority="tertiary" icon={<XIcon />} />}
      />
    );
  }, [rightProp]);

  return (
    <Island
      as="header"
      row
      className={cn(
        "justify-between py-3",
        {
          "items-center": !hasDescription,
        },
        className,
      )}
      {...props}
    >
      {left}
      {right}
    </Island>
  );
}

export function DrawerSection({
  title,
  className,
  children,
  ...props
}: DrawerSectionProps) {
  return (
    <Island className={cn("gap-2 p-2", className)} {...props}>
      {title && <p className="text-neutral-6 font-medium">{title}</p>}
      {children}
    </Island>
  );
}

export function DrawerContent({ children }: DrawerContentProps) {
  return (
    <DrawerBase.Portal>
      <DrawerBase.Backdrop className="bg-neutral-7/30 dark:bg-neutral-3/60 fixed inset-0 h-full w-full backdrop-blur duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*300ms)] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute" />
      <DrawerBase.Viewport className="fixed inset-0 flex items-end justify-center">
        <DrawerBase.Popup className="bg-neutral-1 rounded-t-5 -mb-12 max-h-[calc(80vh+3rem)] w-full transform-[translateY(var(--drawer-swipe-movement-y))] touch-auto overflow-y-auto overscroll-contain pb-12 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:transform-[translateY(calc(100%-3rem+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*300ms)] data-starting-style:transform-[translateY(calc(100%-3rem+2px))] data-swiping:select-none">
          <DrawerBase.Content className="bg-neutral-2 flex w-full flex-col gap-1">
            {children}
          </DrawerBase.Content>
        </DrawerBase.Popup>
      </DrawerBase.Viewport>
    </DrawerBase.Portal>
  );
}
