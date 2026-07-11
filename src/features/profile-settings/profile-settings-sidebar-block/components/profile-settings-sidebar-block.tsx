import { SparklesIcon } from "lucide-react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Island } from "@/shared/components/ui/island";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

type ProfileSettingsSidebarBlockProps = {
  title: string;
  items: readonly string[];
};

export function ProfileSettingsSidebarBlock({
  title,
  items,
}: ProfileSettingsSidebarBlockProps) {
  return (
    <Island
      title={
        <div className="flex items-center gap-2">
          <SparklesIcon className="size-5" />
          <span>{title}</span>
        </div>
      }
      className="gap-4"
    >
      <ul className="text-neutral-8 flex list-disc flex-col gap-2 pl-5">
        {items.map((item) => (
          <li key={item} className="text-base">
            {item}
          </li>
        ))}
      </ul>
    </Island>
  );
}

type ProfileSettingsSidebarBlockSkeletonProps = {
  titleClassName?: string;
  itemsCount: number;
};

export function ProfileSettingsSidebarBlockSkeleton({
  titleClassName = "w-56",
  itemsCount,
}: ProfileSettingsSidebarBlockSkeletonProps) {
  return (
    <Island className="gap-4">
      <TextSkeleton fontSize={18} lineHeight={28} className={titleClassName} />
      <ItemsList
        count={itemsCount}
        gap={12}
        item={<TextSkeleton fontSize={16} lineHeight={24} className="w-full" />}
      />
    </Island>
  );
}
