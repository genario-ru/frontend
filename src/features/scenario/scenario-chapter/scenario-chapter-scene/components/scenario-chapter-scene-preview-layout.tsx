import { ImagePlayIcon } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
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
    <Card className={cn("shrink-0", className)}>
      <CardHeader>
        <LucideIcon icon={ImagePlayIcon} />
        <CardTitle>Превью сцены</CardTitle>
        {actions && <CardActions>{actions}</CardActions>}
      </CardHeader>
      <CardContent
        className={cn(
          "p-0",
          {
            "aspect-video": videoTypeSlug === "long",
            "aspect-9/16": videoTypeSlug === "short",
          },
          contentClassName,
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}
