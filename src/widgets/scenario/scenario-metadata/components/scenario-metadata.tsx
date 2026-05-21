import { useMemo } from "react";

import { ScenarioMetadataCardSkeleton } from "@/features/scenario/scenario-metadata/scenario-metadata-card/components/scenario-metadata-card";
import { ScenarioMetadataPlaceholder } from "@/features/scenario/scenario-metadata/scenario-metadata-placeholder/components/scenario-metadata-placeholder";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { ItemsList } from "@/shared/components/common/items-list";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { CRLF } from "@/shared/constants/unicode";

import { useScenarioMetadata } from "../hooks/use-scenario-metadata";
import { ScenarioMetadataCardWithDialog } from "./scenario-metadata-card-with-dialog";

type ScenarioMetadataProps = {
  scenarioId: string;
};

export function ScenarioMetadata({ scenarioId }: ScenarioMetadataProps) {
  const {
    metadataItems,
    isLoading,
    isError,
    isGenerating,
    isFailed,
    isEmpty,
    isGenerateMetadataPending,
    generateMetadata,
  } = useScenarioMetadata({ scenarioId });

  const body = useMemo(() => {
    if (isLoading) {
      return <ScenarioMetadataSkeleton />;
    }

    if (isError) {
      return <ScenarioMetadataErrorPlug />;
    }

    if (isGenerating) {
      return (
        <GenerationAlert
          hasGradient={false}
          title="Генерируем метаданные"
          description="Генерируем метаданные для платформ, подождите несколько секунд"
          className="border-neutral-3 flex-1 border"
        />
      );
    }

    if (isFailed) {
      return (
        <ScenarioMetadataPlaceholder
          variant="negative"
          title="Не удалось сгенерировать"
          description={`Произошла ошибка при генерации метаданных.${CRLF}Попробуйте ещё раз.`}
          actionLabel="Попробовать снова"
          hasFadeCards={false}
          isActionPending={isGenerateMetadataPending}
          onAction={generateMetadata}
        />
      );
    }

    if (isEmpty) {
      return (
        <ScenarioMetadataPlaceholder
          title="Метаданные ещё не сгенерированы"
          description="Сгенерируйте метаданные под все платформы сценария"
          actionLabel="Сгенерировать метаданные"
          onAction={generateMetadata}
          isActionPending={isGenerateMetadataPending}
        />
      );
    }

    return (
      <div className="grid w-full gap-2 lg:grid-cols-2">
        {metadataItems.map((item) => (
          <ScenarioMetadataCardWithDialog
            key={item.id}
            scenarioId={scenarioId}
            metadata={item}
          />
        ))}
      </div>
    );
  }, [
    generateMetadata,
    isEmpty,
    isError,
    isFailed,
    isGenerateMetadataPending,
    isGenerating,
    isLoading,
    metadataItems,
    scenarioId,
  ]);

  return (
    <Island
      grow
      title="Метаданные"
      description="Соберите заголовки, описания и теги под нужные платформы, чтобы быстрее подготовить видео к публикации."
    >
      {body}
    </Island>
  );
}

export function ScenarioMetadataSkeleton() {
  return (
    <ItemsList
      count={2}
      gap={8}
      item={<ScenarioMetadataCardSkeleton />}
      className="w-full lg:flex-row"
      itemClassName="flex-1"
    />
  );
}

export function ScenarioMetadataErrorPlug() {
  return (
    <Plug
      variant="negative"
      className="flex-1"
      title="Ошибка"
      description="Не удалось загрузить метаданные"
    />
  );
}
