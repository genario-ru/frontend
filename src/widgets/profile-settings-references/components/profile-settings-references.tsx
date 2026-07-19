import { useMemo } from "react";

import type { ProfileSettingsReferencesSearch } from "@/routes/_with-auth/_with-subscription/profiles/settings/references";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

import { profileSettingsReferenceSections } from "../constants/profile-settings-reference-sections";
import { useProfileSettingsReferences } from "../hooks/use-profile-settings-references";
import {
  ProfileSettingsReferencesSection,
  ProfileSettingsReferencesSectionSkeleton,
} from "./profile-settings-references-section";
import {
  ProfileSettingsReferencesSidebar,
  ProfileSettingsReferencesSidebarSkeleton,
} from "./profile-settings-references-sidebar";

type ProfileSettingsReferencesProps = ProfileSettingsReferencesSearch;

export function ProfileSettingsReferences({
  profileId,
}: ProfileSettingsReferencesProps) {
  const { isDesktop } = useBreakpoints();

  const {
    referenceSections,
    attachmentsBySection,
    channelVideos,
    referencesCounts,
    uploadFilesHandlers,
    isDataLoading,
    isError,
  } = useProfileSettingsReferences({ profileId });

  const referencesContent = useMemo(() => {
    if (isError) {
      return <ProfileSettingsReferencesErrorPlug />;
    }

    return referenceSections.map((section) => {
      if (section.key === "videoReferences") {
        return (
          <ProfileSettingsReferencesSection
            key={section.key}
            section={section}
            profileId={profileId}
            attachments={attachmentsBySection[section.key]}
            channelVideos={channelVideos}
            isDataLoading={isDataLoading}
            onFilesSelect={uploadFilesHandlers[section.key]}
          />
        );
      }

      return (
        <ProfileSettingsReferencesSection
          key={section.key}
          section={section}
          profileId={profileId}
          attachments={attachmentsBySection[section.key]}
          isDataLoading={isDataLoading}
          onFilesSelect={uploadFilesHandlers[section.key]}
        />
      );
    });
  }, [
    profileId,
    attachmentsBySection,
    channelVideos,
    isDataLoading,
    isError,
    referenceSections,
    uploadFilesHandlers,
  ]);

  return (
    <ContentLayout className="isolate grid flex-1 grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="flex min-w-0 flex-col gap-2">
        <Island className="flex-1 gap-8">{referencesContent}</Island>
      </section>
      {isDesktop && (
        <ProfileSettingsReferencesSidebar referencesCounts={referencesCounts} />
      )}
    </ContentLayout>
  );
}

export function ProfileSettingsReferencesSkeleton() {
  const { isDesktop } = useBreakpoints();
  return (
    <ContentLayout className="isolate grid flex-1 grid-cols-1 gap-2 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="flex min-w-0 flex-col gap-2">
        <Island className="flex-1 gap-8">
          {profileSettingsReferenceSections.map((section) => (
            <ProfileSettingsReferencesSectionSkeleton
              key={section.key}
              withLinks={section.withLinks}
            />
          ))}
        </Island>
      </section>
      {isDesktop && <ProfileSettingsReferencesSidebarSkeleton />}
    </ContentLayout>
  );
}

function ProfileSettingsReferencesErrorPlug() {
  return (
    <Plug
      variant="negative"
      className="flex-1"
      title="Ошибка загрузки"
      description="Произошла ошибка при загрузке референсов. Попробуйте обновить страницу"
    />
  );
}
