import {
  useEventListener,
  useThrottleCallback,
} from "@siberiacancode/reactuse";
import { useEffect, useRef, useState } from "react";

const SCROLL_DIRECTION_THRESHOLD = 10;
const THROTTLE_MS = 100;

export function usePageScrollDirection() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const pageContentRef = useRef<HTMLElement | null>(null);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const pageContent = document.getElementById("root-content");

    if (pageContent) {
      pageContentRef.current = pageContent;
      lastScrollTopRef.current = pageContent.scrollTop;
    }
  }, []);

  const handleScroll = useThrottleCallback(() => {
    if (!pageContentRef.current) {
      return;
    }

    const currentScrollTop = pageContentRef.current.scrollTop;
    const lastScrollTop = lastScrollTopRef.current;
    const delta = lastScrollTop - currentScrollTop;

    lastScrollTopRef.current = currentScrollTop;

    if (Math.abs(delta) < SCROLL_DIRECTION_THRESHOLD) {
      return;
    }

    setIsScrollingUp(delta > 0);
  }, THROTTLE_MS);

  useEventListener(pageContentRef, "scroll", handleScroll);

  return { isScrollingUp };
}
