import { useMemo } from "react";

import type { IdeasListSettingsSearch } from "@/routes/_with-auth/_with-subscription/ideas-lists/settings";
import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useIdeasListSettings } from "../hooks/use-ideas-list-settings";
import {
  IdeasListSettingsForm,
  IdeasListSettingsFormErrorPlug,
  IdeasListSettingsFormSkeleton,
} from "./ideas-list-settings-form";

type IdeasListSettingsProps = IdeasListSettingsSearch;

export function IdeasListSettings({
  templateId,
  ideasListId,
}: IdeasListSettingsProps) {
  const { ideasListData, isIdeasListLoading, isIdeasListError } =
    useIdeasListSettings({ ideasListId });

  const body = useMemo(() => {
    if (isIdeasListLoading) {
      return <IdeasListSettingsFormSkeleton />;
    }

    if (isIdeasListError) {
      return <IdeasListSettingsFormErrorPlug />;
    }

    return (
      <IdeasListSettingsForm
        templateId={templateId}
        ideasListData={ideasListData}
      />
    );
  }, [templateId, ideasListData, isIdeasListLoading, isIdeasListError]);

  return (
    <ContentLayout size="md" className="flex-1">
      {body}
    </ContentLayout>
  );
}
