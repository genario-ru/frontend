import { useMemo } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";

import { useIdeasListSettings } from "../hooks/use-ideas-list-settings";
import { IdeasListSettingsForm } from "./ideas-list-settings-form";

type IdeasListSettingsProps = {
  ideasListId?: string;
};

export function IdeasListSettings({ ideasListId }: IdeasListSettingsProps) {
  const { ideasListData, isIdeasListLoading, isIdeasListError } =
    useIdeasListSettings({ ideasListId });

  const body = useMemo(() => {
    if (isIdeasListLoading) {
      return <div>Loading...</div>;
    }

    if (isIdeasListError) {
      return <div>Error...</div>;
    }

    return <IdeasListSettingsForm ideasListData={ideasListData} />;
  }, [ideasListData, isIdeasListLoading, isIdeasListError]);

  return (
    <ContentLayout size="md" className="flex-1">
      {body}
    </ContentLayout>
  );
}
