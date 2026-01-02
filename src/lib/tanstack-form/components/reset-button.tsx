import { useStore } from "@tanstack/react-form";
import { isEqual } from "es-toolkit";

import { Button, type ButtonProps } from "@/shared/components/ui/button";

import { useFormContext } from "..";

type ResetButtonProps = Omit<ButtonProps, "type" | "onClick"> & {
  onClickCallback?: () => void;
};

export const ResetButton = ({
  disabled,
  onClickCallback,
  ...props
}: ResetButtonProps) => {
  const form = useFormContext();
  const defaultValues = form.options.defaultValues;
  const values = useStore(form.store, (state) => state.values);
  const formHasChanges = !isEqual(values, defaultValues);

  const onResetButtonClick = () => {
    form.reset();
    onClickCallback?.();
  };

  return (
    <form.Subscribe>
      <Button
        type="reset"
        disabled={!formHasChanges || disabled}
        onClick={onResetButtonClick}
        {...props}
      />
    </form.Subscribe>
  );
};
