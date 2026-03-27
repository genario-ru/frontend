import { useStore } from "@tanstack/react-form";

import { FieldLayout } from "@/shared/components/layouts/field-layout";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";

import { useFieldContext } from "..";

type SelectFieldProps = PropsWithClassName<{
  label?: string | null;
  items: {
    label: string;
    value: string;
    icon?: string;
  }[];
  itemClassName?: string;
}>;

export const RadioCardsGroupField = ({
  label,
  items,
  className,
  itemClassName,
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
    <FieldLayout labelText={label} message={errors[0]} className={className}>
      <RadioCardsGroup
        defaultValue={defaultValue}
        value={value}
        onBlur={handleBlur}
        onValueChange={handleChange}
      >
        {items.map((item) => (
          <RadioCardsGroupItem
            key={item.value}
            value={item.value}
            className={itemClassName}
          >
            {item.label}
            {item.icon && <LucideIcon icon={item.icon} />}
          </RadioCardsGroupItem>
        ))}
      </RadioCardsGroup>
    </FieldLayout>
  );
};
