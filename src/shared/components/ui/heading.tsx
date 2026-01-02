import { type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";

import { headingVariants } from "@/shared/constants/heading-variants";
import { cn } from "@/shared/utils/cn";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: ElementType;
  };

export const Heading = ({
  className,
  variant,
  children,
  as,
  ...props
}: HeadingProps) => {
  const Comp = as ?? variant ?? "h1";

  return (
    <Comp className={cn(headingVariants({ variant }), className)} {...props}>
      {children}
    </Comp>
  );
};
