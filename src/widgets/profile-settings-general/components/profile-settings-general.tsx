import { useMemo } from "react";

import type { ProfileSettingsGeneralSearch } from "@/routes/_with-auth/_with-subscription/profiles/settings";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { useProfileSettings } from "../hooks/use-profile-settings-general";
import {
  ProfileSettingsGeneralForm,
  ProfileSettingsGeneralFormSkeleton,
} from "./profile-settings-general-form";
import { ProfileSettingsSidebarGeneral } from "./profile-settings-sidebar-general";

type ProfileSettingsGeneralProps = ProfileSettingsGeneralSearch;

export function ProfileSettingsGeneral({
  profileId,
}: ProfileSettingsGeneralProps) {
  const { isDesktop } = useBreakpoints();

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
    <ContentLayout className="isolate grid flex-1 grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_24rem]">
      {content}
      {isDesktop && <ProfileSettingsSidebarGeneral />}
    </ContentLayout>
  );
}

function ProfileSettingsGeneralSkeleton() {
  return <ProfileSettingsGeneralFormSkeleton />;
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
