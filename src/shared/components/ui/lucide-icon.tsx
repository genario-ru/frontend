import type { LucideIcon as LucideIconType, LucideProps } from "lucide-react";
import { DynamicIcon, type IconName, iconNames } from "lucide-react/dynamic";

import { svgIconVariants } from "@/shared/constants/svg-icon-variants";
import { cn } from "@/shared/utils/cn";

import { type SVGIconVariantProps } from "./svg-icon";

type Icon = LucideIconType | string;

export type LucideIconProps = LucideProps &
  SVGIconVariantProps & { icon: Icon };

export const LucideIcon = ({
  icon: Icon,
  size,
  color,
  priority,
  className,
  ...props
}: LucideIconProps) => {
  if (typeof Icon === "string") {
    if (iconNames.includes(Icon as IconName)) {
      return (
        <DynamicIcon
          // @ts-expect-error TODO: Попробовать разобраться, почему тут TypeScript выделывается
          name={Icon as IconName}
          className={cn(svgIconVariants({ size, color, priority }), className)}
          {...props}
        />
      );
    }

    console.warn(`Icon ${Icon} is not Lucide icon`);

    return null;
  }

  return (
    <Icon
      className={cn(svgIconVariants({ size, color, priority }), className)}
      {...props}
    />
  );
};
