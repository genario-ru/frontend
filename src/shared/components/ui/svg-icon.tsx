import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, FC, SVGProps } from "react";

import { svgIconVariants } from "@/shared/constants/svg-icon-variants";
import { cn } from "@/shared/utils/cn";

export type SVGIconVariantProps = VariantProps<typeof svgIconVariants>;

type SvgIconProps = ComponentProps<"svg"> &
  SVGIconVariantProps & { icon: FC<SVGProps<SVGElement>> };

export const SvgIcon = ({ icon: Icon, size, ...props }: SvgIconProps) => {
  return <Icon className={cn(svgIconVariants({ size }))} {...props} />;
};
