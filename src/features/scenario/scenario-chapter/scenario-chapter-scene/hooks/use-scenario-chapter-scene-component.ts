import { useCallback, useRef } from "react";

import { useCopyElementContent } from "@/shared/hooks/use-copy-element-content";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";

export function useScenarioChapterSceneComponent() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isTouchScreen = checkTouchScreen();

  const { copy, isCopied } = useCopyElementContent({
    element: contentRef,
  });

  const handleCopyButtonClick = useCallback(() => {
    copy();
  }, [copy]);

  return {
    contentRef,
    isCopied,
    isTouchScreen,
    handleCopyButtonClick,
  };
}
