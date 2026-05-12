import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  CheckboxGroup,
  CheckboxGroupItem,
} from "@/shared/components/ui/checkbox-group";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

import type { ArchiveMultiselectFilterProps } from "./archive-multiselect-filter";

export function ArchiveMultiselectFilterDrawer({
  slug,
  name,
  icon,
  options,
  currentValues = [],
  handleChange,
}: ArchiveMultiselectFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
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
      />
      <DrawerContent>
        <DrawerHeader title={name} />
        <DrawerSection roundedBottom={false}>
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
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
