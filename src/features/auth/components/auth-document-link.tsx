import { Link, type LinkComponentProps } from "@tanstack/react-router";

import { cn } from "@/shared/utils/cn";

export const AuthDocumentLink = ({
  className,
  ...props
}: LinkComponentProps) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "hover:text-neutral-8 active:text-neutral-8 focus:text-neutral-8 underline",
        className,
      )}
      {...props}
    />
  );
};
