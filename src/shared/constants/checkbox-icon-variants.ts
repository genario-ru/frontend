import { cva } from "class-variance-authority";

export const checkboxIconVariants = cva("stroke-neutral-1 shrink-0", {
  variants: {
    size: {
      sm: "size-3.5",
      base: "size-4",
    },
  },
  defaultVariants: {
    size: "base",
  },
});
