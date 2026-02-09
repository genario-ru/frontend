import type { ComponentProps, CSSProperties } from "react";

import { Heading } from "@/shared/components/ui/heading";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

type TemplateCardProps = ComponentProps<"div"> & {
  icon?: string | null;
  title: string;
  description?: string | null;
  color?: string;
  clickable?: boolean;
  active?: boolean;
};

export function TemplateCard({
  icon,
  title,
  description,
  color,
  clickable = false,
  active = false,
  className,
  children,
  ...props
}: TemplateCardProps) {
  const templateColor = color ?? "var(--neutral-8)";

  return (
    <div
      style={{ "--template-color": templateColor } as CSSProperties}
      className={cn(
        "rounded-4 flex flex-col justify-between gap-4 bg-(--template-color)/10 p-4 duration-200 dark:bg-(--template-color)/20",
        {
          "cursor-pointer": clickable,
          "ring-2 ring-(--template-color)": active,
        },
        className,
      )}
      {...props}
    >
      <header className="flex gap-2">
        {icon && (
          <LucideIcon icon={icon} className="stroke-(--template-color)" />
        )}
        <Heading variant="h3">{title}</Heading>
      </header>
      {description && (
        <p className="text-neutral-7 line-clamp-4 text-sm">{description}</p>
      )}
      {children}
    </div>
  );
}
