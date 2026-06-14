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
      warning: "",
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
      className: "stroke-positive-6",
    },
    {
      color: "positive",
      priority: "secondary",
      className: "stroke-positive-5",
    },
    {
      color: "positive",
      priority: "tertiary",
      className: "stroke-positive-4",
    },
    // Negative
    {
      color: "negative",
      priority: "primary",
      className: "stroke-negative-6",
    },
    {
      color: "negative",
      priority: "secondary",
      className: "stroke-negative-5",
    },
    {
      color: "negative",
      priority: "tertiary",
      className: "stroke-negative-4",
    },
    // Warning
    {
      color: "warning",
      priority: "primary",
      className: "stroke-warning-6",
    },
    {
      color: "warning",
      priority: "secondary",
      className: "stroke-warning-5",
    },
    {
      color: "warning",
      priority: "tertiary",
      className: "stroke-warning-4",
    },
  ],
});
