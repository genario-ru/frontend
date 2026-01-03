import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type FormHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: ReactNode;
};

export const FormHeader = ({
  title,
  description,
  className,
  children,
}: FormHeaderProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {title && <h1 className="text-2xl font-bold">{title}</h1>}
      {description && (
        <p className="text-neutral-7 text-center text-sm whitespace-pre-wrap">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
