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
          "from-neutral-1 bg-linear-to-r to-violet-300": hasGradient,
        },
        className,
      )}
      {...props}
    >
      <header className="flex items-center gap-2">
        <LucideIcon
          icon={LoaderPinwheelIcon}
          className="animate-spin stroke-violet-500"
        />
        <Heading variant="h3">{title}</Heading>
      </header>
      {description && <p className="text-neutral-7">{description}</p>}
    </Island>
  );
}
