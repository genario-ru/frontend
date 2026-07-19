import { ArrowUpRightIcon, InfoIcon } from "lucide-react";

import { ButtonLink } from "@/shared/components/ui/button-link";
import { Heading } from "@/shared/components/ui/heading";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

export function ProfilesImportOtherPlatforms() {
  return (
    <section className="border-neutral-3 rounded-4 flex w-full flex-col gap-4 border p-4">
      <header className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <LucideIcon icon={InfoIcon} className="stroke-accent-6" />
          <Heading variant="h3">
            Что делать, если канал на другой платформе?
          </Heading>
        </div>
        <p className="text-neutral-7">
          Для этого перейдите в режим ручного создания профиля вашего канала
        </p>
      </header>
      <ButtonLink
        to="/profiles/settings"
        priority="tertiary"
        icon={<ArrowUpRightIcon />}
        align="center"
        className="w-full"
      >
        К ручному созданию
      </ButtonLink>
    </section>
  );
}
