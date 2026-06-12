import type { CheckedState } from "@radix-ui/react-checkbox";
import { useStore } from "@tanstack/react-form";
import { isNil, noop } from "es-toolkit";
import { ChevronRightIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";

import { FieldLayout } from "@/shared/components/layouts/field-layout";
import { Button, type ButtonProps } from "@/shared/components/ui/button";
import {
  CheckboxChipsGroup,
  CheckboxChipsGroupItem,
} from "@/shared/components/ui/checkbox-chips-group";

import { useFieldContext } from "..";

type CheckboxChipsFieldProps = Omit<
  ComponentProps<typeof CheckboxChipsGroup>,
  "title"
> & {
  title?: string | null;
  items: { value: string; children: ReactNode }[];
  itemProps?: ButtonProps;
  lastItem?: ReactNode;
  defaultMaxVisibleItems?: number;
  onCheckedChangeCallback?: (
    shouldBeChecked: CheckedState,
    value: string,
  ) => void;
};

type CheckboxChipsFieldItem = { value: string; children: ReactNode };

type UseCheckboxChipsFieldParams = {
  items: CheckboxChipsFieldItem[];
  defaultMaxVisibleItems: number | undefined;
};

export const CheckboxChipsField = ({
  title,
  items: itemsProp,
  itemProps,
  lastItem,
  defaultMaxVisibleItems,
  onCheckedChangeCallback = noop,
  ...props
}: CheckboxChipsFieldProps) => {
  const {
    store,
    defaultValue,
    checkedValues,
    visibleItems,
    hasShowAllButton,
    showAll,
    onCheckedChange,
  } = useCheckboxChipsField({
    items: itemsProp,
    defaultMaxVisibleItems,
  });

  const errors: string[] = useStore(store, (state) => state.meta.errors);

  return (
    <FieldLayout labelText={title} message={errors[0]}>
      <CheckboxChipsGroup {...props}>
        {visibleItems.map((item) => (
          <CheckboxChipsGroupItem
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
            {...itemProps}
          >
            {item.children}
          </CheckboxChipsGroupItem>
        ))}
        {hasShowAllButton && (
          <Button
            type="button"
            size="lg"
            icon={<ChevronRightIcon />}
            onClick={showAll}
            {...itemProps}
          >
            Показать все
          </Button>
        )}
        {lastItem}
      </CheckboxChipsGroup>
    </FieldLayout>
  );
};

function useCheckboxChipsField({
  items,
  defaultMaxVisibleItems = Number.POSITIVE_INFINITY,
}: UseCheckboxChipsFieldParams) {
  const {
    store,
    options: { defaultValue },
    state: { value: checkedValues },
    pushValue,
    removeValue,
  } = useFieldContext<string[] | undefined>();

  const isCollapsible = defaultMaxVisibleItems > 0;

  const [isAllVisible, setIsAllVisible] = useState(() => {
    if (!isCollapsible) {
      return true;
    }

    return items.length <= defaultMaxVisibleItems;
  });

  const { visibleItems, hasShowAllButton } = useMemo(() => {
    if (!isCollapsible) {
      return {
        visibleItems: items,
        hasShowAllButton: false,
      };
    }

    if (isAllVisible) {
      return {
        visibleItems: items,
        hasShowAllButton: false,
      };
    }

    return {
      visibleItems: items.slice(0, defaultMaxVisibleItems!),
      hasShowAllButton: items.length > defaultMaxVisibleItems!,
    };
  }, [items, isAllVisible, defaultMaxVisibleItems, isCollapsible]);

  const showAll = useCallback(() => {
    setIsAllVisible(true);
  }, []);

  const onCheckedChange = useCallback(
    (shouldBeChecked: CheckedState, value: string) => {
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
    },
    [checkedValues, removeValue, pushValue],
  );

  return {
    store,
    defaultValue,
    checkedValues,
    visibleItems,
    hasShowAllButton,
    showAll,
    onCheckedChange,
  };
}
