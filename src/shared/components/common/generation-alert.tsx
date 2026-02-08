import { LoaderPinwheelIcon } from "lucide-react";

import { Heading } from "../ui/heading";
import { Island } from "../ui/island";
import { LucideIcon } from "../ui/lucide-icon";

type GenerationAlertProps = {
  title?: string;
  description?: string;
};

export function GenerationAlert({
  title = "Идет генерация",
  description,
}: GenerationAlertProps) {
  return (
    <Island className="from-neutral-1 items-center gap-1 bg-linear-to-r to-violet-300">
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
