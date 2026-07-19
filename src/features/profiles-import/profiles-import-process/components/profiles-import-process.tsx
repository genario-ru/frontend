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
        "from-neutral-8 to-accent-4 text-neutral-1 rounded-5 flex w-full flex-col gap-6 bg-linear-to-br p-5 lg:w-[480px] lg:shrink-0",
        className,
      )}
    >
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <LucideIcon icon={ZapIcon} color="warning" className="size-6" />
          <Heading variant="h2" className="text-neutral-1 text-2xl">
            {PROFILES_IMPORT_PROCESS_TITLE}
          </Heading>
        </div>
        <p className="text-neutral-3">{PROFILES_IMPORT_PROCESS_DESCRIPTION}</p>
      </header>
      <ol className="flex flex-col gap-6">
        {profilesImportProcessSteps.map((step) => (
          <li key={step.number} className="flex items-start gap-4">
            <div className="bg-neutral-1/30 rounded-3 flex shrink-0 items-center justify-center p-3">
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
