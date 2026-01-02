import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import { breakpoints } from "../constants/breakpoints";

export function useBreakpoints() {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet - 1}px)`);
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.desktop - 1}px)`);
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.desktop}px)`);

  return useMemo(
    () => ({
      isMobile,
      isTablet,
      isDesktop,
    }),
    [isMobile, isTablet, isDesktop],
  );
}
