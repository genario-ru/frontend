import type { ComponentProps, CSSProperties } from "react";

import { Heading } from "@/shared/components/ui/heading";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

type TemplateCardProps = ComponentProps<"div"> & {
  icon: string | null;
  title: string;
  description: string | null;
  color: string;
};

export function TemplateCard({
  icon,
  title,
  description,
  color,
  className,
  children,
  ...props
}: TemplateCardProps) {
  return (
    <div
      style={{ "--template-color": color } as CSSProperties}
      className={cn(
        "rounded-4 flex flex-col justify-between gap-4 bg-(--template-color)/10 p-4 duration-200",
        className,
      )}
      {...props}
    >
      <header className="flex gap-2">
        {icon && (
          <LucideIcon
            icon={icon}
            className="mt-0.5 stroke-(--template-color)"
          />
        )}
        <Heading variant="h4">{title}</Heading>
      </header>
      {description && (
        <p className="text-neutral-7 line-clamp-4 text-sm">{description}</p>
      )}
      {children}
    </div>
  );
}
