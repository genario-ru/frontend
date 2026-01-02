import * as Slot from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { type ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type CardProps = ComponentProps<"div"> & { asChild?: boolean };

export const cardVariants = cva(
  "bg-neutral-2 flex flex-col gap-4 rounded-4 border p-4 duration-200",
);

export const Card = ({ asChild, className, ...props }: CardProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return <Comp className={cn(cardVariants(), className)} {...props} />;
};

export const CardHeader = ({
  className,
  ...props
}: ComponentProps<"header">) => (
  <header className={cn("flex flex-col gap-0.5", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: ComponentProps<"p">) => (
  <p
    className={cn("line-clamp-2 text-lg font-semibold", className)}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => (
  <p
    className={cn("text-new-neutral-7 line-clamp-4 text-sm", className)}
    {...props}
  />
);

export const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("flex w-full flex-col gap-4", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: ComponentProps<"footer">) => (
  <footer className={cn("flex items-center", className)} {...props} />
);
