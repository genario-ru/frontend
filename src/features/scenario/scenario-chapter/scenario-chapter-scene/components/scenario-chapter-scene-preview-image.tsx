import { ProgressiveImage } from "@/shared/components/common/progressive-image";

type ScenarioChapterScenePreviewImageProps = {
  urlCompressed: string;
  url: string;
};

export function ScenarioChapterScenePreviewImage({
  urlCompressed,
  url,
}: ScenarioChapterScenePreviewImageProps) {
  return (
    <ProgressiveImage urlCompressed={urlCompressed} url={url} alt="Preview" />
  );
}
