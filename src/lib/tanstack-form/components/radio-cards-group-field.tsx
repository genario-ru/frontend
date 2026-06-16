import { useStore } from "@tanstack/react-form";
import type { ReactNode } from "react";

import { FieldLayout } from "@/shared/components/layouts/field-layout";
import {
  RadioCardsGroup,
  RadioCardsGroupItem,
  type RadioCardsGroupItemProps,
} from "@/shared/components/ui/radio-cards-group";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";

import { useFieldContext } from "..";

type SelectFieldProps = PropsWithClassName<{
  label?: string | null;
  items: {
    label: string;
    value: string;
    icon?: ReactNode;
  }[];
  itemProps?: Partial<RadioCardsGroupItemProps>;
}>;

export const RadioCardsGroupField = ({
  label,
  items,
  itemProps,
  className,
}: SelectFieldProps) => {
  const {
    options: { defaultValue },
    state: { value },
    store,
    handleChange,
    handleBlur,
  } = useFieldContext<string | undefined>();

  const errors: string[] = useStore(store, (state) => state.meta.errors);
  const itemState = errors.length > 0 ? "error" : "default";

  return (
    <FieldLayout labelText={label} message={errors[0]}>
      <RadioCardsGroup
        defaultValue={defaultValue}
        value={value}
        onBlur={handleBlur}
        onValueChange={handleChange}
        className={className}
      >
        {items.map((item) => (
          <RadioCardsGroupItem
            key={item.value}
            value={item.value}
            state={itemState}
            {...itemProps}
          >
            {item.icon}
            {item.label}
          </RadioCardsGroupItem>
        ))}
      </RadioCardsGroup>
    </FieldLayout>
  );
};
