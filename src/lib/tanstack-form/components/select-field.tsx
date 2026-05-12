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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { cn } from "@/shared/utils/cn";

import { useFieldContext } from "..";

const DEFAULT_EMPTY_VALUE_PLACEHOLDER = "Выбрать значение";
const DEFAULT_DRAWER_TITLE = "Выбор значения";
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

type SelectFieldContentProps = {
  itemGroups: SelectFieldProps["itemGroups"];
  value: string | undefined;
  isLoading?: boolean;
  onSelect: (nextValue: string) => void;
  onBlur: () => void;
};

export const SelectField = ({
  label,
  emptyValuePlaceholder = DEFAULT_EMPTY_VALUE_PLACEHOLDER,
  portalContainerRef,
  isLoading,
  className,
  buttonProps,
  itemGroups,
}: SelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useBreakpoints();

  const {
    state: { value },
    store,
    handleChange,
    handleBlur,
  } = useFieldContext<string | undefined>();

  const triggerItem: SelectFieldItem = useMemo(() => {
    const defaultItem = { label: emptyValuePlaceholder, value: "" };

    if (!value) return defaultItem;

    const items = itemGroups.map((group) => group.items).flat();
    const item = items.find((currentItem) => currentItem.value === value);

    return item ?? defaultItem;
  }, [value, emptyValuePlaceholder, itemGroups]);

  const errors: string[] = useStore(store, (state) => state.meta.errors);

  const trigger = (
    <Button
      type="button"
      priority="secondary"
      aria-expanded={open}
      state={errors.length > 0 ? "error" : "default"}
      icon={<LucideIcon icon={ChevronDownIcon} />}
      className={cn("text-neutral-6 w-full justify-between", {
        "text-neutral-8": value && value.length > 0,
      })}
      {...buttonProps}
    >
      <SelectFieldOptionData
        icon={triggerItem.icon}
        label={triggerItem.label}
        value={triggerItem.value}
      />
    </Button>
  );

  return (
    <FieldLayout labelText={label} message={errors[0]} className={className}>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger render={trigger} />
          <DrawerContent>
            <DrawerHeader title={label || DEFAULT_DRAWER_TITLE} />
            <SelectFieldMobileContent
              itemGroups={itemGroups}
              value={value}
              isLoading={isLoading}
              onBlur={handleBlur}
              onSelect={(nextValue) => {
                handleChange(nextValue);
                setOpen(false);
              }}
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={open} onOpenChange={setOpen} modal={false}>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
          <PopoverContent
            className="p-0"
            sideOffset={8}
            portalContainerRef={portalContainerRef}
          >
            <SelectFieldCommandContent
              itemGroups={itemGroups}
              value={value}
              isLoading={isLoading}
              onBlur={handleBlur}
              onSelect={(nextValue) => {
                handleChange(nextValue);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </FieldLayout>
  );
};

function SelectFieldOptionData({ icon, label, description }: SelectFieldItem) {
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      {description && (
        <p className="text-neutral-6 text-left text-sm">{description}</p>
      )}
    </div>
  );
}

function SelectFieldCommandContent({
  itemGroups,
  value,
  isLoading,
  onSelect,
  onBlur,
}: SelectFieldContentProps) {
  return (
    <Command shouldFilter={false} loop={true}>
      <CommandInput className="sr-only" />
      <CommandList>
        {isLoading ? (
          <CommandLoading />
        ) : itemGroups.length === 0 ? (
          <CommandEmpty>{EMPTY_CAPTION}</CommandEmpty>
        ) : (
          itemGroups.map((group) => (
            <CommandGroup
              key={`command-group-${group.label}`}
              heading={group.label}
            >
              {group.items.map((item) => {
                const handleSelect = () => {
                  if (value === item.value) return;

                  onSelect(item.value);
                };

                return (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    isActive={value === item.value}
                    onBlur={onBlur}
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
  );
}

function SelectFieldMobileContent({
  itemGroups,
  value,
  isLoading,
  onSelect,
  onBlur,
}: SelectFieldContentProps) {
  if (isLoading) {
    return <p className="text-neutral-6 px-4 py-3 text-sm">Загрузка...</p>;
  }

  if (itemGroups.length === 0) {
    return <p className="text-neutral-6 px-4 py-3 text-sm">{EMPTY_CAPTION}</p>;
  }

  return (
    <RadioGroup
      value={value}
      onValueChange={(nextValue) => {
        if (value === nextValue) return;

        onSelect(nextValue as string);
      }}
      className="gap-1"
    >
      {itemGroups.map((group, groupIndex) => (
        <DrawerSection
          key={`mobile-select-group-${group.label}-${groupIndex}`}
          title={group.label ?? undefined}
          roundedBottom={
            groupIndex === itemGroups.length - 1 ? false : undefined
          }
        >
          {group.items.map((item) => (
            <RadioGroupItem
              key={item.value}
              value={item.value}
              rounding="base"
              onBlur={onBlur}
            >
              <SelectFieldOptionData {...item} />
            </RadioGroupItem>
          ))}
        </DrawerSection>
      ))}
    </RadioGroup>
  );
}
