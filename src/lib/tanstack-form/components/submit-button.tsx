import { Button, type ButtonProps } from "@/shared/components/ui/button";

import { useFormContext } from "..";

type SubmitButtonProps = Omit<ButtonProps, "type">;

export const SubmitButton = ({
  disabled,
  state,
  ...props
}: SubmitButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => {
        const finalState = state ?? (isSubmitting ? "loading" : "default");
        const finalDisabled =
          finalState === "loading" || !canSubmit || disabled;

        return (
          <Button
            type="submit"
            priority="primary"
            state={finalState}
            disabled={finalDisabled}
            {...props}
          />
        );
      }}
    </form.Subscribe>
  );
};
