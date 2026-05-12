import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { ArchiveMultiselectFilterDrawer } from "./archive-multiselect-filter-drawer";
import { ArchiveMultiselectFilterDropdown } from "./archive-multiselect-filter-dropdown";

export type ArchiveMultiselectFilterProps = {
  slug: string;
  name: string;
  icon: string | null;
  options: { value: string; label: string }[];
  currentValues: string[] | undefined;
  handleChange: (value: string | string[]) => void;
};

export function ArchiveMultiselectFilter({
  slug,
  name,
  icon,
  options,
  currentValues,
  handleChange,
}: ArchiveMultiselectFilterProps) {
  const { isMobile } = useBreakpoints();

  if (isMobile) {
    return (
      <ArchiveMultiselectFilterDrawer
        slug={slug}
        name={name}
        icon={icon}
        options={options}
        currentValues={currentValues}
        handleChange={handleChange}
      />
    );
  }

  return (
    <ArchiveMultiselectFilterDropdown
      slug={slug}
      name={name}
      icon={icon}
      options={options}
      currentValues={currentValues}
      handleChange={handleChange}
    />
  );
}
