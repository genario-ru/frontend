import { useMemo } from "react";

import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

export function useLandingTemplatesCarousel() {
  const { isMobile, isTablet } = useBreakpoints();
  const { templatesData, isTemplatesLoading } = useGetTemplates();

  const slidesPerView = useMemo(() => {
    if (isMobile) {
      return 1.1;
    }

    if (isTablet) {
      return 2.1;
    }

    return 3.2;
  }, [isMobile, isTablet]);

  return {
    templatesData,
    isTemplatesLoading,
    slidesPerView,
  };
}
