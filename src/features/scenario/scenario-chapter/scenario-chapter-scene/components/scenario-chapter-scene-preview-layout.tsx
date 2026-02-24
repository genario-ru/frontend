import { ImagePlayIcon } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";

import { Card } from "@/shared/components/ui/card";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

type ScenarioChapterScenePreviewLayoutProps = PropsWithChildren<
  PropsWithClassName<{
    actions?: ReactNode;
    videoTypeSlug?: string;
    contentClassName?: string;
  }>
>;

export function ScenarioChapterScenePreviewLayout({
  actions,
  videoTypeSlug,
  contentClassName,
  className,
  children,
}: ScenarioChapterScenePreviewLayoutProps) {
  return (
    <Card
      className={cn("shrink-0", className)}
      title="Превью сцены"
      headerIcon={<LucideIcon icon={ImagePlayIcon} />}
      headerActions={actions}
      contentClassName={cn(
        "overflow-hidden p-0",
        {
          "aspect-video": videoTypeSlug === "long",
          "aspect-9/16": videoTypeSlug === "short",
        },
        contentClassName,
      )}
    >
      {children}
    </Card>
  );
}
