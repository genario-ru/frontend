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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { cn } from "@/shared/utils/cn";

import { useFieldContext } from "..";

const DEFAULT_EMPTY_VALUE_PLACEHOLDER = "Выбрать значение";
const DEFAULT_DRAWER_TITLE = "Выбор значений";
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

type MultiSelectFieldContentProps = {
  groupedItems: MultiSelectFieldProps["groupedItems"];
  value: string[];
  isLoading?: boolean;
  onBlur: () => void;
  onToggle: (nextValue: string) => void;
};

function MultiSelectFieldCommandContent({
  groupedItems,
  value,
  isLoading,
  onBlur,
  onToggle,
}: MultiSelectFieldContentProps) {
  return (
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
              {group.items.map((currentItem) => (
                <CommandMultiselectItem
                  key={currentItem.value}
                  value={currentItem.value}
                  isActive={value.some(
                    (valueItem) => valueItem === currentItem.value,
                  )}
                  onBlur={onBlur}
                  onSelect={() => onToggle(currentItem.value)}
                >
                  {currentItem.label}
                </CommandMultiselectItem>
              ))}
            </CommandGroup>
          ))
        )}
      </CommandList>
    </Command>
  );
}

export const MultiSelectField = ({
  label,
  emptyValuePlaceholder = DEFAULT_EMPTY_VALUE_PLACEHOLDER,
  isLoading,
  className,
  groupedItems,
}: MultiSelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useBreakpoints();

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

    return itemLabels.map((item) => item.label).join(", ");
  }, [value, emptyValuePlaceholder, groupedItems]);

  const errors: string[] = useStore(store, (state) => state.meta.errors);

  const trigger = (
    <Button
      type="button"
      priority="secondary"
      aria-expanded={open}
      state={errors.length > 0 ? "error" : "default"}
      icon={<ChevronDownIcon />}
      className={cn("text-neutral-6 w-full justify-between", {
        "text-neutral-8": value.length > 0,
      })}
    >
      <p className="w-fit truncate text-inherit">{triggerLabel}</p>
    </Button>
  );

  const content = (
    <MultiSelectFieldCommandContent
      groupedItems={groupedItems}
      value={value}
      isLoading={isLoading}
      onBlur={handleBlur}
      onToggle={(nextValue) => {
        const isActiveItem = value.some((valueItem) => valueItem === nextValue);

        if (isActiveItem) {
          handleChange(value.filter((valueItem) => valueItem !== nextValue));
          return;
        }

        handleChange([...value, nextValue]);
      }}
    />
  );

  return (
    <FieldLayout labelText={label} message={errors[0]} className={className}>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger render={trigger} />
          <DrawerContent>
            <DrawerHeader title={label || DEFAULT_DRAWER_TITLE} />
            {content}
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
          <PopoverContent className="p-0" sideOffset={8}>
            {content}
          </PopoverContent>
        </Popover>
      )}
    </FieldLayout>
  );
};
