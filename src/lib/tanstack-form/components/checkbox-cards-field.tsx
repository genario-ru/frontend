import type { CheckedState } from "@radix-ui/react-checkbox";
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
    pushValue,
    removeValue,
  } = useFieldContext<string[] | undefined>();

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
    <FieldLayout labelText={title}>
      <CheckboxCardsGroup {...props}>
        {items.map((item) => (
          <CheckboxCardsGroupItem
            key={item.value}
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
