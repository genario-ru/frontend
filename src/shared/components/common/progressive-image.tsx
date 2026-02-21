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
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

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
      {/* Сжатое изображение — показывается первым, размыто пока грузится полноразмерное */}
      <img
        src={urlCompressed}
        alt={alt}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-[filter] duration-300",
          {
            "blur-sm": hasHighQuality && !isHighQualityLoaded,
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
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
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
