import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const skeletonVariants = cva("animate-pulse", {
  variants: {
    mode: {
      light: "bg-neutral-3",
    },
  },
  defaultVariants: {
    mode: "light",
  },
});

export type SkeletonProps = VariantProps<typeof skeletonVariants> &
  ComponentProps<"div">;

export const Skeleton = ({ mode, className, ...props }: SkeletonProps) => {
  return (
    <div
      {...props}
      title="Загрузка..."
      className={cn(skeletonVariants({ mode }), className)}
    />
  );
};
