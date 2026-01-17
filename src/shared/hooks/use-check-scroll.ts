import { throttle } from "es-toolkit";
import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type UseCheckScrollParams<T extends HTMLElement> = {
  elementRef: RefObject<T | null>;
  throttleTimeout?: number;
  scrollOffsetTop?: number;
  scrollOffsetBottom?: number;
};

type UseCheckScrollReturn = {
  isScrolled: boolean;
  isScrolledToBottom: boolean;
};

const DEFAULT_SCROLL_TOP_OFFSET = 0;
const DEFAULT_SCROLL_BOTTOM_OFFSET = 1;
const DEFAULT_THROTTLE_TIMEOUT_MS = 100;

export const useCheckScroll = <T extends HTMLElement>({
  elementRef,
  throttleTimeout = DEFAULT_THROTTLE_TIMEOUT_MS,
  scrollOffsetBottom = DEFAULT_SCROLL_BOTTOM_OFFSET,
  scrollOffsetTop = DEFAULT_SCROLL_TOP_OFFSET,
}: UseCheckScrollParams<T>): UseCheckScrollReturn => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const checkScrollState = useCallback(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = element;

    setIsScrolled(scrollTop > scrollOffsetTop);
    setIsScrolledToBottom(
      Math.abs(scrollHeight - scrollTop - clientHeight) < scrollOffsetBottom,
    );
  }, [elementRef, scrollOffsetTop, scrollOffsetBottom]);

  const throttledCheckScrollState = useMemo(
    () => throttle(checkScrollState, throttleTimeout),
    [checkScrollState, throttleTimeout],
  );

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    checkScrollState();
    element.addEventListener("scroll", throttledCheckScrollState);

    const resizeObserver = new ResizeObserver(throttledCheckScrollState);

    resizeObserver.observe(element);

    return () => {
      element.removeEventListener("scroll", throttledCheckScrollState);
      resizeObserver.disconnect();
      throttledCheckScrollState.cancel();
    };
  }, [elementRef, checkScrollState, throttledCheckScrollState]);

  return {
    isScrolled,
    isScrolledToBottom,
  };
};
