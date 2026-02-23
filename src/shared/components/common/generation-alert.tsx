import { LoaderPinwheelIcon } from "lucide-react";

import { cn } from "@/shared/utils/cn";

import { Heading } from "../ui/heading";
import { Island, type IslandProps } from "../ui/island";
import { LucideIcon } from "../ui/lucide-icon";

type GenerationAlertProps = IslandProps & {
  title?: string;
  description?: string;
  hasGradient?: boolean;
};

export function GenerationAlert({
  title = "Идет генерация",
  description,
  hasGradient = true,
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
        <Heading variant="h3">{title}</Heading>
      </header>
      {description && (
        <p className="text-neutral-7 max-w-sm text-center">{description}</p>
      )}
    </Island>
  );
}
