import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const navigationStep = cva(
  "w-full h-fit duration-200 flex flex-col font-medium gap-1.5 text-new-neutral-8 items-center",
  {
    variants: {
      state: {
        default:
          "*:data-step-indicator:bg-new-neutral-3 hover:*:data-step-indicator:bg-new-neutral-4",
        active: "*:data-step-indicator:bg-new-neutral-8",
        disabled: "*:data-step-indicator:bg-new-neutral-2 text-new-neutral-6",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export type NavigationStepVariantProps = VariantProps<typeof navigationStep>;

export type NavigationStep<T extends string> = {
  id: T;
  label: string;
  active: boolean;
  disabled: boolean;
};

type NavigationStepsProps<T extends string> = ComponentProps<"nav"> & {
  steps: NavigationStep<T>[];
  onStepClick: (step: NavigationStep<T>) => void;
};

export const NavigationSteps = <T extends string>({
  steps,
  onStepClick,
  className,
  ...props
}: NavigationStepsProps<T>) => {
  return (
    <nav className={cn("flex w-full items-center gap-2", className)} {...props}>
      {steps.map((step) => {
        let state: NavigationStepVariantProps["state"] = "default";

        if (step.active) {
          state = "active";
        } else if (step.disabled) {
          state = "disabled";
        }

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick(step)}
            disabled={step.disabled}
            className={navigationStep({ state })}
          >
            {step.label}
            <div
              data-step-indicator
              className="h-1.5 w-full rounded-full duration-200"
            />
          </button>
        );
      })}
    </nav>
  );
};
