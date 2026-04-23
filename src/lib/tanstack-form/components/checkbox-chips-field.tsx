import type { CheckedState } from "@radix-ui/react-checkbox";
import { isNil, noop } from "es-toolkit";
import type { ComponentProps, ReactNode } from "react";

import { FieldLayout } from "@/shared/components/layouts/field-layout";
import {
  CheckboxChipsGroup,
  CheckboxChipsGroupItem,
  type CheckboxChipsGroupItemProps,
} from "@/shared/components/ui/checkbox-chips-group";

import { useFieldContext } from "..";

type CheckboxChipsFieldProps = Omit<
  ComponentProps<typeof CheckboxChipsGroup>,
  "title"
> & {
  title?: string | null;
  items: { value: string; children: ReactNode }[];
  itemProps?: CheckboxChipsGroupItemProps;
  onCheckedChangeCallback?: (
    shouldBeChecked: CheckedState,
    value: string,
  ) => void;
};

export const CheckboxChipsField = ({
  title,
  items,
  itemProps,
  onCheckedChangeCallback = noop,
  ...props
}: CheckboxChipsFieldProps) => {
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
      <CheckboxChipsGroup {...props}>
        {items.map((item) => (
          <CheckboxChipsGroupItem
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
            {...itemProps}
          >
            {item.children}
          </CheckboxChipsGroupItem>
        ))}
      </CheckboxChipsGroup>
    </FieldLayout>
  );
};
