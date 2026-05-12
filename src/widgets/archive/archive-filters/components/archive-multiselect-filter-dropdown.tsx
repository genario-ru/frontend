import { Button } from "@/shared/components/ui/button";
import {
  CheckboxGroup,
  CheckboxGroupItem,
} from "@/shared/components/ui/checkbox-group";
import { DragSafeDropdownMenu } from "@/shared/components/ui/drag-safe-dropdown-menu";
import { DropdownMenuGroup } from "@/shared/components/ui/dropdown-menu";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

import type { ArchiveMultiselectFilterProps } from "./archive-multiselect-filter";

export function ArchiveMultiselectFilterDropdown({
  slug,
  name,
  icon,
  options,
  currentValues = [],
  handleChange,
}: ArchiveMultiselectFilterProps) {
  return (
    <DragSafeDropdownMenu
      trigger={
        <Button
          size="sm"
          iconPosition="left"
          icon={icon && <LucideIcon icon={icon} />}
          className={cn({
            "ring-neutral-8 ring-2": currentValues.length > 0,
          })}
        >
          {name}
        </Button>
      }
    >
      <DropdownMenuGroup>
        <CheckboxGroup
          id={slug}
          value={currentValues}
          onValueChange={handleChange}
        >
          {options.map((option) => (
            <CheckboxGroupItem
              key={option.value}
              value={option.value}
              rounding="base"
            >
              {option.label}
            </CheckboxGroupItem>
          ))}
        </CheckboxGroup>
      </DropdownMenuGroup>
    </DragSafeDropdownMenu>
  );
}
