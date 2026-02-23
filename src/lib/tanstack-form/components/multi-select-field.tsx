import { useStore } from "@tanstack/react-form";
import { ChevronDownIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { FieldLayout } from "@/shared/components/layouts/field-layout";
import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandLoading,
  CommandMultiselectItem,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/utils/cn";

import { useFieldContext } from "..";

const DEFAULT_EMPTY_VALUE_PLACEHOLDER = "Выбрать значение";
const EMPTY_CAPTION = "Навыков по запросу не найдено";

type MultiSelectFieldProps = {
  label?: string | null;
  emptyValuePlaceholder?: string;
  isLoading?: boolean;
  groupedItems: {
    label?: string | null;
    items: {
      label: string;
      value: string;
    }[];
  }[];
  className?: string;
};

export const MultiSelectField = ({
  label,
  emptyValuePlaceholder = DEFAULT_EMPTY_VALUE_PLACEHOLDER,
  isLoading,
  className,
  groupedItems,
}: MultiSelectFieldProps) => {
  const [open, setOpen] = useState(false);

  const {
    state: { value },
    store,
    handleChange,
    handleBlur,
  } = useFieldContext<string[]>();

  const triggerLabel = useMemo(() => {
    if (value.length < 1) return emptyValuePlaceholder;

    const flattenedItems = groupedItems.map((group) => group.items).flat();
    const itemLabels = flattenedItems.filter((item) =>
      value.includes(item.value),
    );
    const composedLabel = itemLabels.map((item) => item.label).join(", ");

    return composedLabel;
  }, [value, emptyValuePlaceholder, groupedItems]);

  const errors: string[] = useStore(store, (state) => state.meta.errors);

  return (
    <FieldLayout
      labelText={label}
      errorMessage={errors[0]}
      className={className}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            priority="secondary"
            aria-expanded={open}
            icon={<ChevronDownIcon />}
            className={cn("w-full justify-between", {
              "text-neutral-8": value.length > 0,
            })}
          >
            <p className="w-fit truncate text-inherit">{triggerLabel}</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" sideOffset={8}>
          <Command shouldFilter={false} loop={true}>
            <CommandInput className="sr-only" />
            <CommandList>
              {isLoading ? (
                <CommandLoading />
              ) : groupedItems.length === 0 ? (
                <CommandEmpty>{EMPTY_CAPTION}</CommandEmpty>
              ) : (
                groupedItems.map((group) => (
                  <CommandGroup
                    key={`command-group-${group.label}`}
                    heading={group.label}
                  >
                    {group.items.map((currentItem) => {
                      const handleSelect = () => {
                        const isActiveItem = value.some(
                          (valueItem) => valueItem === currentItem.value,
                        );

                        if (isActiveItem) {
                          handleChange(
                            value.filter(
                              (valueItem) => valueItem !== currentItem.value,
                            ),
                          );
                        } else {
                          handleChange([...value, currentItem.value]);
                        }
                      };

                      return (
                        <CommandMultiselectItem
                          key={currentItem.value}
                          value={currentItem.value}
                          isActive={value.some(
                            (valueItem) => valueItem === currentItem.value,
                          )}
                          onBlur={handleBlur}
                          onSelect={handleSelect}
                        >
                          {currentItem.label}
                        </CommandMultiselectItem>
                      );
                    })}
                  </CommandGroup>
                ))
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FieldLayout>
  );
};
