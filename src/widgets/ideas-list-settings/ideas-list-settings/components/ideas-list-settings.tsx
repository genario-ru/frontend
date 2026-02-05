import { useMemo } from "react";

import type { IdeasListSettingsSearch } from "@/routes/_app/ideas-lists/settings";
import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useIdeasListSettings } from "../hooks/use-ideas-list-settings";
import { IdeasListSettingsForm } from "./ideas-list-settings-form";

type IdeasListSettingsProps = IdeasListSettingsSearch;

export function IdeasListSettings({
  templateId,
  ideasListId,
}: IdeasListSettingsProps) {
  const { ideasListData, isIdeasListLoading, isIdeasListError } =
    useIdeasListSettings({ ideasListId });

  const body = useMemo(() => {
    if (isIdeasListLoading) {
      return <div>Loading...</div>;
    }

    if (isIdeasListError) {
      return <div>Error...</div>;
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
