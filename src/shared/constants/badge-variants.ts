import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex w-fit h-fit items-center font-medium outline-none",
  {
    variants: {
      color: {
        neutral: "",
        positive: "",
        negative: "",
        warning: "",
        custom: "",
      },
      variant: {
        secondary: "",
        tertiary: "",
      },
      size: {
        base: "text-sm px-2.5 h-8 gap-1.5 [&_svg]:size-4.5 rounded-2.5",
        sm: "text-xs px-1.5 h-6 gap-0.5 [&_svg]:size-3.5 rounded-2",
      },
    },
    compoundVariants: [
      // Neutral
      {
        color: "neutral",
        variant: "secondary",
        className: "bg-neutral-2 text-neutral-8 [&_svg]:stroke-neutral-8",
      },
      {
        color: "neutral",
        variant: "tertiary",
        className: "bg-neutral-1 text-neutral-8 [&_svg]:stroke-neutral-8",
      },
      // Positive
      {
        color: "positive",
        variant: "secondary",
        className: "bg-positive-1 text-positive-5 [&_svg]:stroke-positive-5",
      },
      {
        color: "positive",
        variant: "tertiary",
        className: "bg-neutral-1 text-positive-5 [&_svg]:stroke-positive-5",
      },
      // Negative
      {
        color: "negative",
        variant: "secondary",
        className: "bg-negative-1 text-negative-5 [&_svg]:stroke-negative-5",
      },
      {
        color: "negative",
        variant: "tertiary",
        className: "bg-neutral-1 text-negative-5 [&_svg]:stroke-negative-5",
      },
      // Warning
      {
        color: "warning",
        variant: "secondary",
        className: "bg-warning-1 text-warning-5 [&_svg]:stroke-warning-5",
      },
      {
        color: "warning",
        variant: "tertiary",
        className: "bg-neutral-1 text-warning-5 [&_svg]:stroke-warning-5",
      },
    ],
    defaultVariants: {
      color: "neutral",
      variant: "secondary",
      size: "base",
    },
  },
);
