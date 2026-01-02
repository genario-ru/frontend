import { cva } from "class-variance-authority";

export const headingVariants = cva("w-fit", {
  variants: {
    variant: {
      h1: "text-3xl font-bold",
      h2: "text-2xl font-bold",
      h3: "text-xl font-semibold",
      h4: "text-lg font-semibold",
      h5: "text-base font-medium",
      h6: "text-sm font-medium",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});
