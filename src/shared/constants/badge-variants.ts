import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex w-fit h-fit items-center font-medium outline-none",
  {
    variants: {
      color: {
        neutral: "",
        positive: "",
        negative: "",
        custom: "",
      },
      variant: {
        secondary: "",
        tertiary: "",
      },
      size: {
        base: "text-sm rounded-2.5 px-2.5 py-1.5 gap-1.5",
        sm: "text-xs rounded-2 px-1.5 py-1 gap-1",
      },
    },
    compoundVariants: [
      // Neutral
      {
        color: "neutral",
        variant: "secondary",
        className: "bg-neutral-2 text-neutral-8",
      },
      {
        color: "neutral",
        variant: "tertiary",
        className: "bg-neutral-1 text-neutral-8",
      },
      // Positive
      {
        color: "positive",
        variant: "secondary",
        className: "bg-positive-1 text-positive-8",
      },
      {
        color: "positive",
        variant: "tertiary",
        className: "bg-neutral-1 text-positive-8",
      },
      // Negative
      {
        color: "negative",
        variant: "secondary",
        className: "bg-negative-1 text-negative-8",
      },
      {
        color: "negative",
        variant: "tertiary",
        className: "bg-neutral-1 text-negative-8",
      },
    ],
    defaultVariants: {
      color: "neutral",
      variant: "secondary",
      size: "base",
    },
  },
);
