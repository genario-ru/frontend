import { useEffect, useRef } from "react";

import { useCheckScroll, type UseCheckScrollParams } from "./use-check-scroll";

type UsePageCheckScrollParams = Pick<
  UseCheckScrollParams<HTMLElement>,
  "scrollOffsetBottom" | "scrollOffsetTop" | "throttleTimeout"
>;

export function usePageCheckScroll(params?: UsePageCheckScrollParams) {
  const pageContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const pageContent = document.getElementById("root-content");

    if (pageContent) {
      pageContentRef.current = pageContent;
    }
  }, []);

  return useCheckScroll({
    elementRef: pageContentRef,
    scrollOffsetBottom: 32,
    ...params,
  });
}
