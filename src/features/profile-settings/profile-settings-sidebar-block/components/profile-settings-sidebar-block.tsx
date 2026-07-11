import { type LucideIcon as LucideIconType } from "lucide-react";

import { Island } from "@/shared/components/ui/island";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

type ProfileSettingsSidebarBlockProps = {
  title: string;
  icon: LucideIconType;
  items: readonly string[];
};

export function ProfileSettingsSidebarBlock({
  title,
  icon,
  items,
}: ProfileSettingsSidebarBlockProps) {
  return (
    <Island
      title={
        <div className="flex items-center gap-2">
          <LucideIcon size="sm" icon={icon} />
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
