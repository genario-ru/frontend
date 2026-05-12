import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerSection,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { cn } from "@/shared/utils/cn";

import type { ArchiveSelectFilterProps } from "./archive-select-filter";

export function ArchiveSelectFilterDrawer({
  slug,
  name,
  icon,
  options,
  currentValue,
  handleChange,
}: ArchiveSelectFilterProps) {
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
              "ring-neutral-8 ring-2": currentValue !== undefined,
            })}
          >
            {name}
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader title={name} />
        <DrawerSection roundedBottom={false}>
          <RadioGroup
            id={slug}
            value={currentValue}
            onValueChange={(value) => {
              handleChange(value as string);
              setOpen(false);
            }}
          >
            {options.map((option) => (
              <RadioGroupItem
                key={option.value}
                value={option.value}
                rounding="base"
              >
                {option.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </DrawerSection>
      </DrawerContent>
    </Drawer>
  );
}
