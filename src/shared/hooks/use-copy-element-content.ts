import { type RefObject, useState } from "react";

import { copyElementContent } from "../utils/copy-element-content";

type IUseCopyElementContent = {
  element: RefObject<HTMLElement | null>;
  freshCopyTimeout?: number;
};

type IUseCopyElementContentReturn = {
  copy: (callback?: (status: "error" | "success") => void) => void;
  isCopied: boolean;
};

export function useCopyElementContent({
  element,
  freshCopyTimeout = 3000,
}: IUseCopyElementContent): IUseCopyElementContentReturn {
  const [isCopied, setIsCopied] = useState(false);

  const copy = (callback?: (status: "error" | "success") => void) => {
    if (!element.current) return;

    copyElementContent(element.current, callback);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), freshCopyTimeout);
  };

  return {
    copy,
    isCopied,
  };
}
