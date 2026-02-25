import { useCallback, useRef } from "react";

export function useScenarioNavigationChaptersScroll() {
  const chapterRefsMap = useRef<Map<string, Element>>(new Map());

  const chapterRefCallback = useCallback(
    (el: Element | null, chapterId: string) => {
      if (el) {
        chapterRefsMap.current.set(chapterId, el);
      } else {
        chapterRefsMap.current.delete(chapterId);
      }
    },
    [],
  );

  const handleChapterScrollIntoView = useCallback((chapterId: string) => {
    const activeElement = chapterRefsMap.current.get(chapterId);

    if (!activeElement) {
      return;
    }

    activeElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, []);

  return {
    chapterRefCallback,
    handleChapterScrollIntoView,
  };
}
