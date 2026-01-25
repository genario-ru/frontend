import type { CSSProperties } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";

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
  return (
    <Card className={className}>
      <CardHeader
        style={
          { "--stroke-color": color ?? "var(--neutral-8)" } as CSSProperties
        }
      >
        {icon && <LucideIcon icon={icon} className="stroke-(--stroke-color)" />}
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      {content && (
        <CardContent>
          <ScenarioChapterSceneComponentMarkdown content={content} />
        </CardContent>
      )}
    </Card>
  );
}
