import { ImagePlayIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

type ScenarioChapterScenePreviewProps = PropsWithClassName<{
  videoTypeSlug?: string;
  previewUrl?: string | null;
}>;

export function ScenarioChapterScenePreview({
  videoTypeSlug,
  previewUrl,
  className,
}: ScenarioChapterScenePreviewProps) {
  return (
    <Card className={cn("shrink-0", className)}>
      <CardHeader>
        <LucideIcon icon={ImagePlayIcon} />
        <CardTitle>Пример сцены</CardTitle>
      </CardHeader>
      <CardContent
        className={cn("bg-neutral-2 p-0", {
          "aspect-video": videoTypeSlug === "long",
          "aspect-9/16": videoTypeSlug === "short",
        })}
      >
        <img
          src={previewUrl ?? ""}
          alt="Preview"
          className="h-full w-full object-cover"
        />
      </CardContent>
    </Card>
  );
}

export function ScenarioChapterScenePreviewSkeleton({
  className,
}: PropsWithClassName) {
  return (
    <Card className={cn("shrink-0", className)}>
      <CardHeader>
        <LucideIcon icon={ImagePlayIcon} />
        <CardTitle>Пример сцены</CardTitle>
      </CardHeader>
      <CardContent className="aspect-9/16 p-0">
        <Skeleton className="h-full w-full" />
      </CardContent>
    </Card>
  );
}
