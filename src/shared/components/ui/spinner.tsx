import { LoaderIcon } from "lucide-react";

import { cn } from "@/shared/utils/cn";

import { LucideIcon, type LucideIconProps } from "./lucide-icon";

type SpinnerProps = Omit<LucideIconProps, "icon">;

export const Spinner = ({ className, ...props }: SpinnerProps) => {
  return (
    <LucideIcon
      icon={LoaderIcon}
      className={cn("animate-spin", className)}
      {...props}
    />
  );
};
