import { SearchIcon, XIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { useArchiveSearch } from "../hooks/use-archive-search";

export function ArchiveSearch() {
  const {
    inputRef,
    currentSearch,
    handleApplyArchiveSearchDebounced,
    handleResetArchiveSearch,
  } = useArchiveSearch();

  return (
    <div className="flex flex-1 gap-2">
      <Input
        placeholder="Заголовок или описание..."
        ref={inputRef}
        Icon={SearchIcon}
        defaultValue={currentSearch}
        onChange={handleApplyArchiveSearchDebounced}
      />
      {currentSearch && (
        <Button icon={<XIcon />} onClick={handleResetArchiveSearch} />
      )}
    </div>
  );
}
