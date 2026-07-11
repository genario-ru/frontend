import { SparklesIcon } from "lucide-react";

import { Island } from "@/shared/components/ui/island";

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
