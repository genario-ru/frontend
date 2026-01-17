import type { ReactNode, RefObject } from "react";

import { Heading } from "@/shared/components/ui/heading";

type IdeasListIdeaCardLayoutProps = {
  name?: string | null;
  description?: string | null;
  descriptionRef: RefObject<HTMLParagraphElement | null>;
  secondaryActions: ReactNode;
  primaryActions: ReactNode;
};

export function IdeasListIdeaCardLayout({
  name,
  description,
  descriptionRef,
  secondaryActions,
  primaryActions,
}: IdeasListIdeaCardLayoutProps) {
  const computedName = name ?? "Без названия";

  return (
    <div className="bg-neutral-1 flex flex-col gap-4 rounded-2xl p-4">
      <header className="flex justify-between gap-4">
        <Heading variant="h3">{computedName}</Heading>
        {secondaryActions}
      </header>
      {description && (
        <p ref={descriptionRef} className="flex-1 text-sm">
          {description}
        </p>
      )}
      {primaryActions}
    </div>
  );
}
