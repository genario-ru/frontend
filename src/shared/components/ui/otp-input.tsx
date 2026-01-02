import { cva, type VariantProps } from "class-variance-authority";
import {
  OTPInput as OTPInputBasic,
  type OTPInputProps as OTPInputPropsBasic,
  type SlotProps,
} from "input-otp";

import { cn } from "@/shared/utils/cn";

const otpSlotVariants = cva(
  "relative flex text-xl bg-new-neutral-2 h-16 w-[50px] duration-200 border-transparent font-semibold select-none items-center justify-center rounded-2xl ring-2 ring-transparent",
  {
    variants: {
      state: {
        default: "",
        active: "ring-neutral-12",
        loading: "opacity-50",
        success: "ring-positive-9",
        error: "ring-negative-9",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

type OTPSlotProps = VariantProps<typeof otpSlotVariants> & SlotProps;

type OTPInputProps = VariantProps<typeof otpSlotVariants> &
  Omit<OTPInputPropsBasic, "children">;

export const OTPFakeCaret = () => {
  return (
    <div className="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center select-none">
      <div className="bg-neutral-12 h-7 w-0.5 rounded-full select-none" />
    </div>
  );
};

export const OTPSlot = ({
  char,
  hasFakeCaret,
  isActive,
  state,
}: OTPSlotProps) => {
  const slotState = state === "default" && isActive ? "active" : state;

  return (
    <div className={cn(otpSlotVariants({ state: slotState }))}>
      {char !== null && <div className="select-none">{char}</div>}
      {hasFakeCaret && <OTPFakeCaret />}
    </div>
  );
};

export const OTPInput = ({ state, className, ...props }: OTPInputProps) => {
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
            <OTPSlot key={index} state={state} {...slot} />
          ))}
        </div>
      )}
      {...props}
    />
  );
};
