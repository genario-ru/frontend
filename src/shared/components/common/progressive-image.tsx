import { type ImgHTMLAttributes, useCallback, useState } from "react";

import { cn } from "@/shared/utils/cn";

type ProgressiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src"
> & {
  urlCompressed: string;
  url?: string | null;
  containerClassName?: string;
};

export function ProgressiveImage({
  urlCompressed,
  url,
  alt,
  containerClassName,
  className,
  ...imgProps
}: ProgressiveImageProps) {
  const [isCompressedLoaded, setIsCompressedLoaded] = useState(false);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  const handleCompressedLoad = useCallback(() => {
    setIsCompressedLoaded(true);
  }, []);

  const handleHighQualityLoad = useCallback(() => {
    setIsHighQualityLoaded(true);
  }, []);

  const hasHighQuality = Boolean(url);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        containerClassName,
      )}
    >
      {/* Сжатое изображение — плавно появляется при загрузке, размыто пока грузится полноразмерное */}
      <img
        {...imgProps}
        src={urlCompressed}
        alt={alt}
        onLoad={(e) => {
          handleCompressedLoad();
          imgProps.onLoad?.(e);
        }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-[opacity_100ms,filter_200ms]",
          {
            "blur-sm": hasHighQuality && !isHighQualityLoaded,
            "opacity-100": isCompressedLoaded,
            "opacity-0": !isCompressedLoaded,
          },
          className,
        )}
        {...imgProps}
      />

      {/* Полноразмерное изображение — плавно появляется после загрузки */}
      {hasHighQuality && (
        <img
          {...imgProps}
          src={url ?? undefined}
          alt={alt}
          onLoad={(e) => {
            handleHighQualityLoad();
            imgProps.onLoad?.(e);
          }}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-200",
            {
              "opacity-100": isHighQualityLoaded,
              "opacity-0": !isHighQualityLoaded,
            },
            className,
          )}
        />
      )}
    </div>
  );
}
