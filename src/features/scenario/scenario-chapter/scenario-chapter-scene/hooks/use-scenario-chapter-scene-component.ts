import { useCallback, useRef } from "react";

import { useCopyElementContent } from "@/shared/hooks/use-copy-element-content";

export function useScenarioChapterSceneComponent() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { copy, isCopied } = useCopyElementContent({
    element: contentRef,
  });

  const handleCopyButtonClick = useCallback(() => {
    copy();
  }, [copy]);

  return {
    contentRef,
    isCopied,
    handleCopyButtonClick,
  };
}
