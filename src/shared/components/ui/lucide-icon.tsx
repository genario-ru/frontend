import {
  type LucideIcon as LucideIconType,
  type LucideProps,
  SquircleDashedIcon,
} from "lucide-react";
import type { ComponentType, LazyExoticComponent } from "react";
import { lazy, Suspense } from "react";
import { pascalCase } from "text-case";

import { svgIconVariants } from "@/shared/constants/svg-icon-variants";
import { cn } from "@/shared/utils/cn";

import { type SVGIconVariantProps } from "./svg-icon";

type Icon = LucideIconType | string;

export type LucideIconProps = LucideProps &
  SVGIconVariantProps & { icon: Icon };

type LucideComponent = ComponentType<LucideProps>;

const iconCache = new Map<string, LazyExoticComponent<LucideComponent>>();

const getLazyIcon = (iconName: string) => {
  const normalizedIconName = pascalCase(iconName);
  const cachedIcon = iconCache.get(normalizedIconName);

  if (cachedIcon) {
    return cachedIcon;
  }

  const LazyIcon = lazy(() =>
    import("lucide-react").then((module) => {
      const IconComponent =
        module.icons[normalizedIconName as keyof typeof module.icons] ??
        module.icons.SquircleDashed;

      return { default: IconComponent };
    }),
  );

  iconCache.set(normalizedIconName, LazyIcon);

  return LazyIcon;
};

export const LucideIcon = ({
  icon: Icon,
  size,
  color,
  priority,
  className,
  ...props
}: LucideIconProps) => {
  const iconClassName = cn(
    svgIconVariants({ size, color, priority }),
    className,
  );

  if (typeof Icon === "string") {
    const LazyIcon = getLazyIcon(Icon);

    return (
      <Suspense
        fallback={
          <SquircleDashedIcon className={cn("opacity-30", iconClassName)} />
        }
      >
        <LazyIcon className={iconClassName} {...props} />
      </Suspense>
    );
  }

  return <Icon className={iconClassName} {...props} />;
};
