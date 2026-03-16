import { useCallback, useState } from "react";

export function useIdeasListAppMenubarMoreActions() {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const handleDropdownMenuClose = useCallback(() => {
    setIsDropdownMenuOpen(false);
  }, []);

  return {
    isDropdownMenuOpen,
    setIsDropdownMenuOpen,
    handleDropdownMenuClose,
  };
}
