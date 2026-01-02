import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

export const Avatar = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root>) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("flex shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  );
};

export const AvatarImage = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) => {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
};

export const AvatarFallback = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full cursor-[inherit] items-center justify-center rounded-full font-semibold select-none",
        className,
      )}
      {...props}
    />
  );
};
