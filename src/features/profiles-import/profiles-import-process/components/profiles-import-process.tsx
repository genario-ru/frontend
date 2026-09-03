import { ZapIcon } from "lucide-react";

import { Heading } from "@/shared/components/ui/heading";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { cn } from "@/shared/utils/cn";

import {
  PROFILES_IMPORT_PROCESS_DESCRIPTION,
  PROFILES_IMPORT_PROCESS_TITLE,
  profilesImportProcessSteps,
} from "../constants/profiles-import-process-steps";

type ProfilesImportProcessProps = {
  className?: string;
};

export function ProfilesImportProcess({
  className,
}: ProfilesImportProcessProps) {
  return (
    <aside
      className={cn(
        "from-neutral-8 to-accent-6 dark:from-neutral-1 dark:to-accent-6 text-neutral-1 dark:text-neutral-8 rounded-5 flex flex-col gap-6 bg-linear-to-br p-5",
        className,
      )}
    >
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <LucideIcon
            icon={ZapIcon}
            color="warning"
            priority="secondary"
            className="size-6"
          />
          <Heading variant="h2" className="text-xl">
            {PROFILES_IMPORT_PROCESS_TITLE}
          </Heading>
        </div>
        <p className="text-neutral-3">{PROFILES_IMPORT_PROCESS_DESCRIPTION}</p>
      </header>
      <ol className="flex flex-col gap-6">
        {profilesImportProcessSteps.map((step) => (
          <li key={step.number} className="flex items-start gap-4">
            <div className="rounded-3 flex size-12 shrink-0 items-center justify-center bg-white/30">
              <span className="text-xl font-semibold">{step.number}</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-medium">{step.title}</p>
              <p className="text-neutral-3 text-sm">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
