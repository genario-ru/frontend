import { cva } from "class-variance-authority";

import { cn } from "../utils/cn";

export const buttonVariants = cva(
  cn(
    "group flex items-center border border-transparent font-medium duration-200 gap-2 w-fit h-fit shrink-0 justify-center outline-none overflow-hidden select-none",
    "focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-70 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:duration-200",
  ),
  {
    variants: {
      color: {
        neutral: "",
        positive: "",
        negative: "",
      },
      variant: {
        primary: "",
        secondary: "",
        tertiary: "",
      },
      size: {
        lg: "px-5 py-2.5 gap-2.5 min-h-12 rounded-4 [&_svg]:size-6",
        base: "px-4 py-2 gap-2 min-h-10 rounded-3 [&_svg]:size-6",
        sm: "px-3 py-1.5 gap-1.5 min-h-8 text-sm rounded-2.5 [&_svg]:size-5",
      },
      content: {
        mixed: "",
        icon: "",
      },
      state: {
        default: "",
        loading: "",
        error: "ring-2 ring-negative-5",
      },
    },
    defaultVariants: {
      color: "neutral",
      variant: "secondary",
      size: "base",
      content: "mixed",
      state: "default",
    },
    compoundVariants: [
      // Icon
      {
        size: "base",
        content: "icon",
        className: "size-10 px-0",
      },
      {
        size: "sm",
        content: "icon",
        className: "size-8 px-0",
      },
      // Neutral
      {
        color: "neutral",
        variant: "primary",
        className: cn(
          "bg-neutral-8 text-neutral-1 [&_svg]:stroke-neutral-1",
          "hover:bg-neutral-8/80 active:bg-neutral-8/80 focus-visible:ring-neutral-8",
        ),
      },
      {
        color: "neutral",
        variant: "secondary",
        className: cn(
          "bg-neutral-2 text-neutral-8 [&_svg]:stroke-neutral-8",
          "hover:bg-neutral-3 active:bg-neutral-3 focus-visible:ring-neutral-8",
        ),
      },
      {
        color: "neutral",
        variant: "tertiary",
        className: cn(
          "text-neutral-8 [&_svg]:stroke-neutral-8",
          "hover:bg-neutral-2 active:bg-neutral-2",
          "focus-visible:ring-neutral-8",
        ),
      },
      // Positive
      {
        color: "positive",
        variant: "primary",
        className: cn(
          "bg-positive-6 text-neutral-1 [&_svg]:stroke-neutral-1",
          "dark:bg-positive-5 dark:text-neutral-8 dark:[&_svg]:stroke-neutral-8",
          "hover:bg-positive-6/80 active:bg-positive-6/80",
          "dark:hover:bg-positive-5/80 dark:active:bg-positive-5/80",
          "focus-visible:ring-neutral-8",
        ),
      },
      {
        color: "positive",
        variant: "secondary",
        className: cn(
          "bg-positive-1 text-positive-7 [&_svg]:stroke-positive-7",
          "hover:bg-positive-2 hover:text-positive-8 hover:[&_svg]:stroke-positive-8 active:bg-positive-2 active:text-positive-8 active:[&_svg]:stroke-positive-8",
          "focus-visible:ring-neutral-8",
        ),
      },
      {
        color: "positive",
        variant: "tertiary",
        className: cn(
          "text-positive-7 [&_svg]:stroke-positive-7",
          "hover:bg-positive-1 hover:text-positive-8 hover:[&_svg]:stroke-positive-8 active:bg-positive-1 active:text-positive-8 active:[&_svg]:stroke-positive-8",
          "focus-visible:ring-positive-8",
        ),
      },
      // Negative
      {
        color: "negative",
        variant: "primary",
        className: cn(
          "bg-negative-6 text-neutral-1 [&_svg]:stroke-neutral-1",
          "dark:bg-negative-5 dark:text-neutral-8 dark:[&_svg]:stroke-neutral-8",
          "hover:bg-negative-6/80 active:bg-negative-6/80",
          "dark:hover:bg-negative-5/80 dark:active:bg-negative-5/80",
          "focus-visible:ring-neutral-8",
        ),
      },
      {
        color: "negative",
        variant: "secondary",
        className: cn(
          "bg-negative-1 text-negative-7 [&_svg]:stroke-negative-7",
          "hover:bg-negative-2 hover:text-negative-8 hover:[&_svg]:stroke-negative-8 active:bg-negative-2 active:text-negative-8 active:[&_svg]:stroke-negative-8",
          "focus-visible:ring-neutral-8",
        ),
      },
      {
        color: "negative",
        variant: "tertiary",
        className: cn(
          "text-negative-7 [&_svg]:stroke-negative-7",
          "hover:bg-negative-1 hover:text-negative-8 hover:[&_svg]:stroke-negative-8 active:bg-negative-1 active:text-negative-8 active:[&_svg]:stroke-negative-8",
          "focus-visible:ring-negative-8",
        ),
      },
    ],
  },
);
