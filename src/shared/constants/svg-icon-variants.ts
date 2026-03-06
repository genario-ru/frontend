import { cva } from "class-variance-authority";

export const svgIconVariants = cva("shrink-0", {
  variants: {
    size: {
      xl: "size-8",
      lg: "size-7",
      base: "size-6",
      sm: "size-5",
    },
    color: {
      neutral: "",
      positive: "",
      negative: "",
    },
    priority: {
      primary: "",
      secondary: "",
      tertiary: "",
    },
  },
  defaultVariants: {
    size: "base",
    color: "neutral",
    priority: "primary",
  },
  compoundVariants: [
    // Neutral
    {
      color: "neutral",
      priority: "primary",
      className: "stroke-neutral-8",
    },
    {
      color: "neutral",
      priority: "secondary",
      className: "stroke-neutral-7",
    },
    {
      color: "neutral",
      priority: "tertiary",
      className: "stroke-neutral-6",
    },
    // Positive
    {
      color: "positive",
      priority: "primary",
      className: "stroke-positive-8",
    },
    {
      color: "positive",
      priority: "secondary",
      className: "stroke-positive-7",
    },
    {
      color: "positive",
      priority: "tertiary",
      className: "stroke-positive-6",
    },
    // Negative
    {
      color: "negative",
      priority: "primary",
      className: "stroke-negative-8",
    },
    {
      color: "negative",
      priority: "secondary",
      className: "stroke-negative-7",
    },
    {
      color: "negative",
      priority: "tertiary",
      className: "stroke-negative-6",
    },
  ],
});
