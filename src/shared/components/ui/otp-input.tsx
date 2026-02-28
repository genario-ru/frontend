import { cva, type VariantProps } from "class-variance-authority";
import {
  OTPInput as OTPInputBasic,
  type OTPInputProps as OTPInputPropsBasic,
  type SlotProps,
} from "input-otp";

import { cn } from "@/shared/utils/cn";

const otpSlotVariants = cva(
  "relative flex text-xl bg-neutral-2 h-16 w-[50px] duration-200 border-transparent font-semibold select-none items-center justify-center rounded-5 ring-2 ring-transparent",
  {
    variants: {
      variant: {
        neutral: "",
        accent: "",
      },
      state: {
        default: "",
        active: "",
        loading: "opacity-50",
        success: "ring-positive-6",
        error: "ring-negative-6",
      },
    },
    defaultVariants: {
      variant: "neutral",
      state: "default",
    },
    compoundVariants: [
      {
        variant: "neutral",
        state: "active",
        className: "ring-neutral-8",
      },
      {
        variant: "accent",
        state: "active",
        className: "ring-accent-6",
      },
    ],
  },
);

type OTPSlotProps = VariantProps<typeof otpSlotVariants> & SlotProps;

export type OTPInputProps = VariantProps<typeof otpSlotVariants> &
  Omit<OTPInputPropsBasic, "children">;

export const OTPFakeCaret = () => {
  return (
    <div className="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center select-none">
      <div className="bg-neutral-8 h-7 w-0.5 rounded-full select-none" />
    </div>
  );
};

export const OTPSlot = ({
  char,
  hasFakeCaret,
  isActive,
  variant,
  state,
}: OTPSlotProps) => {
  const slotState = state === "default" && isActive ? "active" : state;

  return (
    <div className={cn(otpSlotVariants({ variant, state: slotState }))}>
      {char !== null && <div className="select-none">{char}</div>}
      {hasFakeCaret && <OTPFakeCaret />}
    </div>
  );
};

export const OTPInput = ({
  variant,
  state,
  className,
  ...props
}: OTPInputProps) => {
  return (
    <OTPInputBasic
      className={cn(
        "group caret-transparent select-none",
        { "pointer-events-none": state === "loading" },
        className,
      )}
      render={({ slots }) => (
        <div className="flex items-center gap-2 select-none">
          {slots.map((slot, index) => (
            <OTPSlot key={index} variant={variant} state={state} {...slot} />
          ))}
        </div>
      )}
      {...props}
    />
  );
};
