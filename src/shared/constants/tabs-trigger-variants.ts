import { cva } from "class-variance-authority";

export const tabsTriggerBasicClassName =
  "px-4 gap-2 h-10 rounded-3 [&_svg]:size-6 font-medium flex items-center whitespace-nowrap outline-none duration-200 disabled:pointer-events-none disabled:opacity-50";

const tabsTriggerDefaultClassName =
  "text-neutral-8 hover:bg-neutral-2 active:bg-neutral-2";

const tabsTriggerActiveClassName = "text-neutral-8 bg-neutral-2";

export const tabsTriggerVariants = cva(tabsTriggerBasicClassName, {
  variants: {
    state: {
      default: tabsTriggerDefaultClassName,
      active: tabsTriggerActiveClassName,
    },
  },
  defaultVariants: {
    state: "default",
  },
});
