import { cva } from "class-variance-authority";

export const underlineTabsTriggerClassName =
  "focus-visible:ring-neutral-8 relative flex font-medium flex-col items-center gap-2 p-3.5 focus-visible:ring-2";

export const underlineTabsTriggerVariants = cva(underlineTabsTriggerClassName, {
  variants: {
    variant: {
      default:
        "text-neutral-7 [&_svg]:stroke-neutral-7 hover:text-neutral-7 active:text-neutral-7 hover:[&_svg]:stroke-neutral-7 active:[&_svg]:stroke-neutral-7",
      active:
        "after:block after:bg-neutral-8 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-t-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
