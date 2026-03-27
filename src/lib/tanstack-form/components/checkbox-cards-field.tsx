import type { CheckedState } from "@radix-ui/react-checkbox";
import { useStore } from "@tanstack/react-form";
import { isNil, noop } from "es-toolkit";
import type { ComponentProps, ReactNode } from "react";

import { FieldLayout } from "@/shared/components/layouts/field-layout";
import {
  CheckboxCardsGroup,
  CheckboxCardsGroupItem,
} from "@/shared/components/ui/checkbox-cards-group";

import { useFieldContext } from "..";

type CheckboxCardsFieldProps = Omit<
  ComponentProps<typeof CheckboxCardsGroup>,
  "title"
> & {
  title?: string | null;
  items: { value: string; children: ReactNode }[];
  onCheckedChangeCallback?: (
    shouldBeChecked: CheckedState,
    value: string,
  ) => void;
};

export const CheckboxCardsField = ({
  title,
  items,
  onCheckedChangeCallback = noop,
  ...props
}: CheckboxCardsFieldProps) => {
  const {
    options: { defaultValue },
    state: { value: checkedValues },
    store,
    pushValue,
    removeValue,
  } = useFieldContext<string[] | undefined>();

  const errors: string[] = useStore(store, (state) => state.meta.errors);

  const onCheckedChange = (shouldBeChecked: CheckedState, value: string) => {
    const valueIndex = checkedValues?.findIndex(
      (valueItem) => valueItem === value,
    );

    if (isNil(valueIndex)) {
      return;
    }

    if (!shouldBeChecked && valueIndex !== -1) {
      removeValue(valueIndex);
      return;
    }

    if (shouldBeChecked && valueIndex === -1) {
      pushValue(value);
      return;
    }
  };

  return (
    <FieldLayout labelText={title} message={errors[0]}>
      <CheckboxCardsGroup {...props}>
        {items.map((item) => (
          <CheckboxCardsGroupItem
            key={item.value}
            state={errors.length > 0 ? "error" : "default"}
            defaultChecked={defaultValue?.some(
              (defaultItem) => defaultItem === item.value,
            )}
            checked={checkedValues?.some(
              (checkedItem) => checkedItem === item.value,
            )}
            onCheckedChange={(shouldBeChecked) => {
              onCheckedChange(shouldBeChecked, item.value);
              onCheckedChangeCallback(shouldBeChecked, item.value);
            }}
          >
            {item.children}
          </CheckboxCardsGroupItem>
        ))}
      </CheckboxCardsGroup>
    </FieldLayout>
  );
};
