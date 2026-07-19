import { cva, type VariantProps } from "class-variance-authority";
import { PaperclipIcon } from "lucide-react";
import { useCallback, useRef } from "react";

import { cn } from "@/shared/utils/cn";

const uploadZoneVariants = cva(
  "border-neutral-4 flex w-full flex-col items-center justify-center gap-1 rounded-4 border border-dashed px-6 py-8 text-center duration-200",
  {
    variants: {
      state: {
        default: "hover:bg-neutral-2",
        error: "border-negative-6 text-negative-6",
      },
      disabled: {
        true: "bg-neutral-1 text-neutral-6 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      state: "default",
      disabled: false,
    },
  },
);

export type UploadZoneProps = {
  accept: string;
  hint: string;
  inputId?: string;
  disabled?: boolean;
  isLoading?: boolean;
  state?: VariantProps<typeof uploadZoneVariants>["state"];
  onFilesSelect: (files: File[]) => void;
};

export function UploadZone({
  accept,
  hint,
  inputId,
  disabled = false,
  isLoading = false,
  state = "default",
  onFilesSelect,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = disabled || isLoading;
  const title = isLoading ? "Загрузка..." : "Загрузить файлы";

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.currentTarget.files ?? []);

      event.currentTarget.value = "";

      if (!files.length) {
        return;
      }

      onFilesSelect(files);
    },
    [onFilesSelect],
  );

  const handleZoneClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        disabled={isDisabled}
        className="sr-only"
        onChange={handleInputChange}
      />
      <button
        type="button"
        disabled={isDisabled}
        onClick={handleZoneClick}
        className={cn(uploadZoneVariants({ state, disabled: isDisabled }))}
      >
        <div className="flex items-center gap-2 font-medium">
          {title}
          <PaperclipIcon className="size-6" />
        </div>
        <div className="text-neutral-6 text-sm">{hint}</div>
      </button>
    </>
  );
}
