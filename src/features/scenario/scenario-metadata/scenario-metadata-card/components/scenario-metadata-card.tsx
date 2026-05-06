import { RotateCcwIcon } from "lucide-react";
import { useMemo } from "react";

import type { ScenarioMetadataExtendedSchema } from "@/codegen/api/product";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { ItemsList } from "@/shared/components/common/items-list";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";
import { cn } from "@/shared/utils/cn";

import { parseMetadataTags } from "../utils/parse-metadata-tags";

type ScenarioMetadataCardProps = {
  metadata: ScenarioMetadataExtendedSchema;
  onRegenerateButtonClick?: () => void;
};

export function ScenarioMetadataCard({
  metadata,
  onRegenerateButtonClick,
}: ScenarioMetadataCardProps) {
  const { platform, status, title, body, tags } = metadata;
  const isTouchScreen = checkTouchScreen();
  const isGenerating = checkIsGenerationStatus(status);
  const tagItems = parseMetadataTags(tags);

  const headerIcon = useMemo(() => {
    if (platform.logoUrl) {
      return (
        <img
          src={platform.logoUrl}
          alt={platform.name}
          className="size-6 rounded-md object-contain"
        />
      );
    }

    return null;
  }, [platform.logoUrl, platform.name]);

  const headerActions = useMemo(() => {
    if (isGenerating || !onRegenerateButtonClick) {
      return null;
    }

    return (
      <Button
        size="sm"
        priority="tertiary"
        icon={<RotateCcwIcon />}
        aria-label={`Повторно сгенерировать метаданные для ${platform.name}`}
        onClick={onRegenerateButtonClick}
        className={cn({
          "opacity-0 duration-200 group-hover/scenario-metadata-card:opacity-100 disabled:opacity-0 group-hover/scenario-metadata-card:disabled:opacity-60":
            !isTouchScreen,
        })}
      />
    );
  }, [isGenerating, isTouchScreen, platform, onRegenerateButtonClick]);

  const content = useMemo(() => {
    if (isGenerating) {
      return (
        <GenerationAlert
          hasGradient={false}
          title="Генерируем метаданные"
          description={`Обновляем данные для ${platform.name}, подождите несколько секунд`}
          className="m-auto"
        />
      );
    }

    return (
      <div className="flex flex-col gap-3">
        <ScenarioMetadataCardSection label="Заголовок" value={title} />
        <ScenarioMetadataCardSection label="Описание" value={body} multiline />
        {tagItems.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <div className="text-neutral-6 text-sm">Теги</div>
            <div className="flex flex-wrap gap-1.5">
              {tagItems.map((tag, index) => (
                <Badge key={`${tag}-${index.toString()}`} size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }, [isGenerating, body, platform, tagItems, title]);

  return (
    <Card
      title={platform.name}
      headerIcon={headerIcon}
      headerActions={headerActions}
      className="group/scenario-metadata-card"
      contentClassName="h-full"
    >
      {content}
    </Card>
  );
}

export function ScenarioMetadataCardSkeleton({
  className,
}: PropsWithClassName) {
  return (
    <Card
      title={<TextSkeleton fontSize={16} lineHeight={24} className="w-32" />}
      headerIcon={<Skeleton className="size-6 rounded-md" />}
      className={className}
    >
      <ItemsList
        count={3}
        gap={12}
        item={<TextSkeleton fontSize={14} lineHeight={20} linesCount={4} />}
      />
    </Card>
  );
}

type ScenarioMetadataCardSectionProps = {
  label: string;
  value: string;
  multiline?: boolean;
};

function ScenarioMetadataCardSection({
  label,
  value,
  multiline = false,
}: ScenarioMetadataCardSectionProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-neutral-6 text-sm">{label}</div>
      <div className={multiline ? "whitespace-pre-line" : undefined}>
        {value}
      </div>
    </div>
  );
}
