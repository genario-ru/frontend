import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const contentLayoutVariants = cva("flex w-full flex-col", {
  variants: {
    size: {
      max: "",
      xl: "max-w-screen-xl",
      lg: "max-w-screen-lg",
      md: "max-w-screen-md",
      sm: "max-w-screen-sm",
      xs: "max-w-lg",
    },
  },
  defaultVariants: {
    size: "max",
  },
});

type ContentLayoutProps = ComponentProps<"div"> &
  VariantProps<typeof contentLayoutVariants>;

export const ContentLayout = ({
  size,
  className,
  children,
  ...props
}: ContentLayoutProps) => {
  return (
    <div className={cn(contentLayoutVariants({ size }), className)} {...props}>
      {children}
    </div>
  );
};
