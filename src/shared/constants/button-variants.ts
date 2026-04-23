import { cva } from "class-variance-authority";

import { cn } from "../utils/cn";

export const buttonVariants = cva(
  cn(
    "group flex items-center font-medium duration-200 gap-2 w-fit h-fit shrink-0 justify-center outline-none overflow-hidden select-none",
    "focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:duration-200",
  ),
  {
    variants: {
      rounding: {
        full: "rounded-full",
        base: "",
      },
      variant: {
        neutral: "",
        positive: "",
        negative: "",
        accent: "",
      },
      priority: {
        primary: "",
        secondary: "",
        tertiary: "",
      },
      size: {
        lg: "px-4 py-2.5 gap-2 min-h-12 [&_svg]:size-6",
        base: "px-3.5 py-2 gap-2 min-h-10 [&_svg]:size-6",
        sm: "px-3 py-1.5 gap-1.5 min-h-8 text-sm [&_svg]:size-4.5",
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
      direction: {
        column: "flex-col",
        row: "flex-row",
      },
      align: {
        center: "",
        start: "",
        end: "",
        between: "",
      },
    },
    defaultVariants: {
      variant: "neutral",
      priority: "secondary",
      size: "base",
      rounding: "base",
      content: "mixed",
      state: "default",
      direction: "row",
      align: "center",
    },
    compoundVariants: [
      // Rounding base (size-dependent)
      {
        rounding: "base",
        size: "lg",
        className: "rounded-4",
      },
      {
        rounding: "base",
        size: "base",
        className: "rounded-3.5",
      },
      {
        rounding: "base",
        size: "sm",
        className: "rounded-3",
      },
      // Align (row)
      {
        direction: "row",
        align: "center",
        className: "justify-center",
      },
      {
        direction: "row",
        align: "start",
        className: "justify-start",
      },
      {
        direction: "row",
        align: "end",
        className: "justify-end",
      },
      {
        direction: "row",
        align: "between",
        className: "justify-between",
      },
      // Align (column)
      {
        direction: "column",
        align: "center",
        className: "items-center",
      },
      {
        direction: "column",
        align: "start",
        className: "items-start",
      },
      {
        direction: "column",
        align: "end",
        className: "items-end",
      },
      {
        direction: "column",
        align: "between",
        className: "items-between",
      },
      // Icon
      {
        size: "lg",
        content: "icon",
        className: "size-12 px-0",
      },
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
        variant: "neutral",
        priority: "primary",
        className: cn(
          "bg-neutral-8 text-neutral-1 [&_svg]:stroke-neutral-1",
          "hover:bg-neutral-8/80 active:bg-neutral-8/80 focus-visible:ring-neutral-8",
        ),
      },
      {
        variant: "neutral",
        priority: "secondary",
        className: cn(
          "bg-neutral-2 text-neutral-8 [&_svg]:stroke-neutral-8",
          "hover:bg-neutral-3 active:bg-neutral-3 focus-visible:ring-neutral-8",
        ),
      },
      {
        variant: "neutral",
        priority: "tertiary",
        className: cn(
          "bg-neutral-1 text-neutral-8 [&_svg]:stroke-neutral-8",
          "hover:bg-neutral-2 active:bg-neutral-2",
          "focus-visible:ring-neutral-8",
        ),
      },
      // Positive
      {
        variant: "positive",
        priority: "primary",
        className: cn(
          "bg-positive-6 text-neutral-1 [&_svg]:stroke-neutral-1",
          "dark:bg-positive-5 dark:text-neutral-8 dark:[&_svg]:stroke-neutral-8",
          "hover:bg-positive-6/80 active:bg-positive-6/80",
          "dark:hover:bg-positive-5/80 dark:active:bg-positive-5/80",
          "focus-visible:ring-neutral-8",
        ),
      },
      {
        variant: "positive",
        priority: "secondary",
        className: cn(
          "bg-positive-1 text-positive-7 [&_svg]:stroke-positive-7",
          "hover:bg-positive-2 hover:text-positive-8 hover:[&_svg]:stroke-positive-8 active:bg-positive-2 active:text-positive-8 active:[&_svg]:stroke-positive-8",
          "focus-visible:ring-neutral-8",
        ),
      },
      {
        variant: "positive",
        priority: "tertiary",
        className: cn(
          "text-positive-7 [&_svg]:stroke-positive-7",
          "hover:bg-positive-1 hover:text-positive-8 hover:[&_svg]:stroke-positive-8 active:bg-positive-1 active:text-positive-8 active:[&_svg]:stroke-positive-8",
          "focus-visible:ring-positive-8",
        ),
      },
      // Negative
      {
        variant: "negative",
        priority: "primary",
        className: cn(
          "bg-negative-6 text-neutral-1 [&_svg]:stroke-neutral-1",
          "dark:bg-negative-5 dark:text-neutral-8 dark:[&_svg]:stroke-neutral-8",
          "hover:bg-negative-6/80 active:bg-negative-6/80",
          "dark:hover:bg-negative-5/80 dark:active:bg-negative-5/80",
          "focus-visible:ring-neutral-8",
        ),
      },
      {
        variant: "negative",
        priority: "secondary",
        className: cn(
          "bg-negative-1 text-negative-7 [&_svg]:stroke-negative-7",
          "hover:bg-negative-2 hover:text-negative-8 hover:[&_svg]:stroke-negative-8 active:bg-negative-2 active:text-negative-8 active:[&_svg]:stroke-negative-8",
          "focus-visible:ring-neutral-8",
        ),
      },
      {
        variant: "negative",
        priority: "tertiary",
        className: cn(
          "text-negative-7 [&_svg]:stroke-negative-7",
          "hover:bg-negative-1 hover:text-negative-8 hover:[&_svg]:stroke-negative-8 active:bg-negative-1 active:text-negative-8 active:[&_svg]:stroke-negative-8",
          "focus-visible:ring-negative-8",
        ),
      },
      // Accent
      {
        variant: "accent",
        priority: "primary",
        className: cn(
          "bg-accent-6 text-neutral-1 [&_svg]:stroke-neutral-1",
          "dark:bg-accent-5 dark:text-neutral-8 dark:[&_svg]:stroke-neutral-8",
          "hover:bg-accent-6/80 active:bg-accent-6/80",
          "dark:hover:bg-accent-5/80 dark:active:bg-accent-5/80",
          "focus-visible:ring-accent-6",
        ),
      },
      {
        variant: "accent",
        priority: "secondary",
        className: cn(
          "bg-accent-1 text-accent-7 [&_svg]:stroke-accent-7",
          "hover:bg-accent-2 hover:text-accent-8 hover:[&_svg]:stroke-accent-8 active:bg-accent-2 active:text-accent-8 active:[&_svg]:stroke-accent-8",
          "focus-visible:ring-accent-6",
        ),
      },
      {
        variant: "accent",
        priority: "tertiary",
        className: cn(
          "text-accent-7 [&_svg]:stroke-accent-7",
          "hover:bg-accent-1 hover:text-accent-8 hover:[&_svg]:stroke-accent-8 active:bg-accent-1 active:text-accent-8 active:[&_svg]:stroke-accent-8",
          "focus-visible:ring-accent-6",
        ),
      },
    ],
  },
);
