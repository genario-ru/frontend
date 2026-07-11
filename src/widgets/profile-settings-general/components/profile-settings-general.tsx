import { useMemo } from "react";

import type { ProfileSettingsGeneralSearch } from "@/routes/_with-auth/_with-subscription/profiles/settings";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";
import { NavigationStepsSkeleton } from "@/shared/components/ui/navigation-steps";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useProfileSettings } from "../hooks/use-profile-settings-general";
import { ProfileSettingsFormActionsSkeleton } from "./profile-settings-form-actions";
import { ProfileSettingsGeneralForm } from "./profile-settings-general-form";

type ProfileSettingsGeneralProps = ProfileSettingsGeneralSearch;

export function ProfileSettingsGeneral({
  profileId,
}: ProfileSettingsGeneralProps) {
  const { profileData, profileTypesData, platformsData, isLoading, isError } =
    useProfileSettings({ profileId });

  const content = useMemo(() => {
    if (isLoading) {
      return <ProfileSettingsGeneralSkeleton />;
    }

    if (isError) {
      return <ProfileSettingsGeneralErrorPlug />;
    }

    if (!profileTypesData || !platformsData) {
      return <ProfileSettingsGeneralNotEnoughDataPlug />;
    }

    return (
      <ProfileSettingsGeneralForm
        profileData={profileData}
        profileTypesData={profileTypesData}
        platformsData={platformsData}
      />
    );
  }, [isError, isLoading, profileData, platformsData, profileTypesData]);

  return (
    <ContentLayout className="isolate grid flex-1 grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1fr)_24rem]">
      {content}
    </ContentLayout>
  );
}

function ProfileSettingsGeneralSkeleton() {
  return (
    <>
      <section className="flex min-w-0 flex-col gap-2">
        <Island className="gap-6">
          <NavigationStepsSkeleton count={2} />
          <div className="flex flex-col gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <TextSkeleton fontSize={16} lineHeight={24} className="w-40" />
                <Skeleton
                  className={index === 0 ? "rounded-4 h-14" : "rounded-4 h-40"}
                />
              </div>
            ))}
          </div>
        </Island>
        <ProfileSettingsFormActionsSkeleton />
      </section>
      <aside className="flex min-w-0 flex-col gap-2">
        <Island className="gap-4">
          <TextSkeleton fontSize={18} lineHeight={28} className="w-56" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <TextSkeleton
                key={index}
                fontSize={16}
                lineHeight={24}
                className="w-full"
              />
            ))}
          </div>
        </Island>
        <Island className="gap-4">
          <TextSkeleton fontSize={18} lineHeight={28} className="w-32" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <TextSkeleton
                key={index}
                fontSize={16}
                lineHeight={24}
                className="w-full"
              />
            ))}
          </div>
        </Island>
      </aside>
    </>
  );
}

function ProfileSettingsGeneralErrorPlug() {
  return (
    <>
      <Island className="min-h-96" roundedBottom={false}>
        <Plug
          variant="negative"
          className="flex-1"
          title="Ошибка загрузки"
          description="Произошла ошибка при загрузке формы. Попробуйте обновить страницу"
        />
      </Island>
      <Island className="min-h-96">
        <Plug
          variant="negative"
          className="flex-1"
          title="Ошибка загрузки"
          description="Не удалось загрузить дополнительную информацию для страницы"
        />
      </Island>
    </>
  );
}

function ProfileSettingsGeneralNotEnoughDataPlug() {
  return (
    <>
      <Island className="min-h-96" roundedBottom={false}>
        <Plug
          variant="negative"
          className="flex-1"
          title="Недостаточно данных"
          description="Недостаточно данных для отображения формы"
        />
      </Island>
      <Island className="min-h-96">
        <Plug
          variant="negative"
          className="flex-1"
          title="Недостаточно данных"
          description="Не удалось собрать правую колонку страницы"
        />
      </Island>
    </>
  );
}
