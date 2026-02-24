import { CheckIcon, CopyIcon } from "lucide-react";
import { type CSSProperties, useMemo } from "react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

import { useScenarioChapterSceneComponent } from "../hooks/use-scenario-chapter-scene-component";
import { ScenarioChapterSceneComponentMarkdown } from "./scenario-chapter-scene-component-markdown";

type ScenarioChapterSceneComponentProps = PropsWithClassName<{
  name: string;
  content?: string | null;
  icon?: string | null;
  color?: string | null;
}>;

export function ScenarioChapterSceneComponent({
  name,
  content,
  icon,
  color,
  className,
}: ScenarioChapterSceneComponentProps) {
  const { contentRef, isCopied, handleCopyButtonClick } =
    useScenarioChapterSceneComponent();

  const iconEl = useMemo(() => {
    if (icon) {
      return (
        <LucideIcon
          icon={icon}
          style={
            {
              "--stroke-color": color ?? "var(--neutral-8)",
            } as CSSProperties
          }
          className="stroke-(--stroke-color)"
        />
      );
    }

    return null;
  }, [color, icon]);

  const actionsEl = useMemo(() => {
    if (content) {
      return (
        <Button
          size="sm"
          priority="tertiary"
          icon={isCopied ? <CheckIcon /> : <CopyIcon />}
          disabled={isCopied}
          onClick={handleCopyButtonClick}
          className="opacity-0 duration-200 group-hover/scenario-chapter-scene:opacity-100 disabled:opacity-0 group-hover/scenario-chapter-scene:disabled:opacity-60"
        />
      );
    }

    return null;
  }, [content, isCopied, handleCopyButtonClick]);

  return (
    <Card
      className={cn("group/scenario-chapter-scene", className)}
      title={name}
      headerIcon={iconEl}
      headerActions={actionsEl}
      contentRef={contentRef}
    >
      {content && <ScenarioChapterSceneComponentMarkdown content={content} />}
    </Card>
  );
}

export function ScenarioChapterSceneComponentSkeleton() {
  return (
    <Card
      className="group/scenario-chapter-scene"
      title={<TextSkeleton fontSize={16} lineHeight={24} className="w-32" />}
      headerIcon={<Skeleton className="size-6 rounded-md" />}
    >
      <ItemsList
        count={3}
        gap={12}
        item={<TextSkeleton fontSize={14} lineHeight={20} linesCount={4} />}
      />
    </Card>
  );
}
