import { CheckIcon, CopyIcon, PencilIcon } from "lucide-react";
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
  componentId: string;
  name: string;
  content?: string | null;
  icon?: string | null;
  color?: string | null;
  handleEditButtonClick: () => void;
}>;

const NOT_TOUCH_SCREEN_BUTTON_CLASSNAME =
  "opacity-0 duration-200 group-hover/scenario-chapter-scene:opacity-100 disabled:opacity-0 group-hover/scenario-chapter-scene:disabled:opacity-60";

export function ScenarioChapterSceneComponent({
  name,
  content,
  icon,
  color,
  className,
  handleEditButtonClick,
}: ScenarioChapterSceneComponentProps) {
  const { contentRef, isCopied, isTouchScreen, handleCopyButtonClick } =
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
        <>
          <Button
            size="sm"
            priority="tertiary"
            icon={<PencilIcon />}
            onClick={handleEditButtonClick}
            className={cn({
              [NOT_TOUCH_SCREEN_BUTTON_CLASSNAME]: !isTouchScreen,
            })}
          />
          <Button
            size="sm"
            priority="tertiary"
            icon={isCopied ? <CheckIcon /> : <CopyIcon />}
            disabled={isCopied}
            onClick={handleCopyButtonClick}
            className={cn({
              [NOT_TOUCH_SCREEN_BUTTON_CLASSNAME]: !isTouchScreen,
            })}
          />
        </>
      );
    }

    return null;
  }, [
    content,
    isCopied,
    isTouchScreen,
    handleCopyButtonClick,
    handleEditButtonClick,
  ]);

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
