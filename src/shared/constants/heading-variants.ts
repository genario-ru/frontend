import { cva } from "class-variance-authority";

export const headingVariants = cva("w-fit", {
  variants: {
    variant: {
      h1: "text-2xl font-semibold",
      h2: "text-xl font-semibold",
      h3: "text-lg font-semibold",
      h4: "text-base font-medium",
      h5: "text-sm font-medium",
      h6: "text-xs font-medium",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});
