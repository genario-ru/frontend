import { CheckIcon, CopyIcon } from "lucide-react";
import { type CSSProperties } from "react";

import { Button } from "@/shared/components/ui/button";
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

  return (
    <Card className={cn("group/scenario-chapter-scene", className)}>
      <CardHeader
        style={
          { "--stroke-color": color ?? "var(--neutral-8)" } as CSSProperties
        }
      >
        {icon && <LucideIcon icon={icon} className="stroke-(--stroke-color)" />}
        <CardTitle>{name}</CardTitle>
        {content && (
          <CardActions className="opacity-0 duration-200 group-hover/scenario-chapter-scene:opacity-100">
            <Button
              size="sm"
              variant="tertiary"
              icon={isCopied ? <CheckIcon /> : <CopyIcon />}
              disabled={isCopied}
              onClick={handleCopyButtonClick}
            />
          </CardActions>
        )}
      </CardHeader>
      {content && (
        <CardContent ref={contentRef}>
          <ScenarioChapterSceneComponentMarkdown content={content} />
        </CardContent>
      )}
    </Card>
  );
}
