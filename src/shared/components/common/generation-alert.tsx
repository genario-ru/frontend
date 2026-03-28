import { LoaderPinwheelIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

import { Heading, type HeadingProps } from "../ui/heading";
import { Island, type IslandProps } from "../ui/island";
import { LucideIcon } from "../ui/lucide-icon";

type GenerationAlertProps = IslandProps & {
  title?: string;
  description?: string;
  hasGradient?: boolean;
  titleProps?: HeadingProps;
  descriptionProps?: ComponentProps<"p">;
};

export function GenerationAlert({
  title = "Идет генерация",
  description,
  hasGradient = true,
  titleProps,
  descriptionProps: {
    className: descriptionClassName,
    ...descriptionProps
  } = {},
  className,
  ...props
}: GenerationAlertProps) {
  return (
    <Island
      className={cn(
        "items-center justify-center gap-1",
        {
          "from-neutral-1 to-accent-3 bg-linear-to-r": hasGradient,
        },
        className,
      )}
      {...props}
    >
      <header className="flex items-center gap-2">
        <LucideIcon
          icon={LoaderPinwheelIcon}
          className="stroke-accent-6 animate-spin"
        />
        <Heading variant="h3" {...titleProps}>
          {title}
        </Heading>
      </header>
      {description && (
        <p
          className={cn(
            "text-neutral-7 max-w-sm text-center",
            descriptionClassName,
          )}
          {...descriptionProps}
        >
          {description}
        </p>
      )}
    </Island>
  );
}
