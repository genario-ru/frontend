import { Button } from "@/shared/components/ui/button";
import { DragSafeDropdownMenu } from "@/shared/components/ui/drag-safe-dropdown-menu";
import { DropdownMenuGroup } from "@/shared/components/ui/dropdown-menu";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { cn } from "@/shared/utils/cn";

type ArchiveSelectFilterProps = {
  slug: string;
  name: string;
  icon: string | null;
  options: { value: string; label: string }[];
  currentValue: string | undefined;
  handleChange: (value: string) => void;
};

export function ArchiveSelectFilter({
  slug,
  name,
  icon,
  options,
  currentValue,
  handleChange,
}: ArchiveSelectFilterProps) {
  return (
    <DragSafeDropdownMenu
      trigger={
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
    >
      <DropdownMenuGroup>
        <RadioGroup
          id={slug}
          value={currentValue}
          onValueChange={(value) => handleChange(value as string)}
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
      </DropdownMenuGroup>
    </DragSafeDropdownMenu>
  );
}
