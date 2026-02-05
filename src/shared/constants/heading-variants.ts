import { cva } from "class-variance-authority";

export const headingVariants = cva("w-fit", {
  variants: {
    variant: {
      h1: "text-xl font-semibold",
      h2: "text-lg font-semibold",
      h3: "text-base font-medium",
      h4: "text-sm font-medium",
      h5: "text-xs font-medium",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});
