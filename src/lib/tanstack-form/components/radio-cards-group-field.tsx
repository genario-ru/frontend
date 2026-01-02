import { useStore } from "@tanstack/react-form";

import { FieldLayout } from "@/shared/components/layouts/field-layout";
import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";

import { useFieldContext } from "..";

type SelectFieldProps = {
  label?: string | null;
  items: {
    label: string;
    value: string;
  }[];
  className?: string;
};

export const RadioCardsGroupField = ({
  label,
  items,
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

  return (
    <FieldLayout
      labelText={label}
      errorMessage={errors[0]}
      className={className}
    >
      <RadioCardsGroup
        defaultValue={defaultValue}
        value={value}
        onBlur={handleBlur}
        onValueChange={handleChange}
      >
        {items.map((item) => (
          <RadioCardsGroupItem key={item.value} value={item.value}>
            {item.label}
          </RadioCardsGroupItem>
        ))}
      </RadioCardsGroup>
    </FieldLayout>
  );
};
