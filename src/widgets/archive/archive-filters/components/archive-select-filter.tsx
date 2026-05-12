import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { ArchiveSelectFilterDrawer } from "./archive-select-filter-drawer";
import { ArchiveSelectFilterDropdown } from "./archive-select-filter-dropdown";

export type ArchiveSelectFilterProps = {
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
  const { isMobile } = useBreakpoints();

  if (isMobile) {
    return (
      <ArchiveSelectFilterDrawer
        slug={slug}
        name={name}
        icon={icon}
        options={options}
        currentValue={currentValue}
        handleChange={handleChange}
      />
    );
  }

  return (
    <ArchiveSelectFilterDropdown
      slug={slug}
      name={name}
      icon={icon}
      options={options}
      currentValue={currentValue}
      handleChange={handleChange}
    />
  );
}
