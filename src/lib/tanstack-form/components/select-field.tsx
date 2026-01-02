import { useStore } from "@tanstack/react-form";
import { ChevronDownIcon } from "lucide-react";
import { type ReactNode, type RefObject, useMemo, useState } from "react";

import { FieldLayout } from "@/shared/components/layouts/field-layout";
import { Button, type ButtonProps } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/shared/components/ui/command";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/utils/cn";

import { useFieldContext } from "..";

const DEFAULT_EMPTY_VALUE_PLACEHOLDER = "Выбрать значение";
const EMPTY_CAPTION = "Результатов по запросу не найдено";

type SelectFieldItem = {
  icon?: ReactNode;
  label: string;
  description?: string | null;
  value: string;
};

type SelectFieldProps = {
  label?: string | null;
  emptyValuePlaceholder?: string;
  isLoading?: boolean;
  itemGroups: {
    label?: string | null;
    items: SelectFieldItem[];
  }[];
  className?: string;
  portalContainerRef?: RefObject<HTMLDivElement | null>;
  buttonProps?: ButtonProps;
};

const SelectFieldOptionData = ({
  icon,
  label,
  description,
}: SelectFieldItem) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      {description && (
        <p className="text-new-neutral-6 text-left text-sm">{description}</p>
      )}
    </div>
  );
};

export const SelectField = ({
  label,
  emptyValuePlaceholder = DEFAULT_EMPTY_VALUE_PLACEHOLDER,
  portalContainerRef,
  isLoading,
  className,
  buttonProps,
  ...props
}: SelectFieldProps) => {
  const [open, setOpen] = useState(false);

  const {
    state: { value },
    store,
    handleChange,
    handleBlur,
  } = useFieldContext<string | undefined>();

  const triggerItem: SelectFieldItem = useMemo(() => {
    const defaultItem = { label: emptyValuePlaceholder, value: "" };

    if (!value) return defaultItem;

    const items = props.itemGroups.map((group) => group.items).flat();
    const item = items.find((item) => item.value === value);

    return item ?? defaultItem;
  }, [value, emptyValuePlaceholder, props]);

  const errors: string[] = useStore(store, (state) => state.meta.errors);

  return (
    <FieldLayout
      labelText={label}
      errorMessage={errors[0]}
      className={className}
    >
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            variant="secondary"
            state={errors.length > 0 ? "error" : "default"}
            icon={<LucideIcon icon={ChevronDownIcon} />}
            className={cn("text-new-neutral-6 w-full justify-between", {
              "text-new-neutral-8": value && value.length > 0,
            })}
            {...buttonProps}
          >
            <SelectFieldOptionData {...triggerItem} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          sideOffset={8}
          portalContainerRef={portalContainerRef}
        >
          <Command shouldFilter={false} loop={true}>
            <CommandInput className="sr-only" />
            <CommandList>
              {isLoading ? (
                <CommandLoading />
              ) : props.itemGroups.length === 0 ? (
                <CommandEmpty>{EMPTY_CAPTION}</CommandEmpty>
              ) : (
                props.itemGroups.map((group) => (
                  <CommandGroup
                    key={`command-group-${group.label}`}
                    heading={group.label}
                  >
                    {group.items.map((item) => {
                      const handleSelect = () => {
                        if (value === item.value) return;

                        handleChange(item.value);
                        setOpen(false);
                      };

                      return (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          isActive={value === item.value}
                          onBlur={handleBlur}
                          onSelect={handleSelect}
                        >
                          <SelectFieldOptionData {...item} />
                        </CommandItem>
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
