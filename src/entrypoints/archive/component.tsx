import { FilmIcon, LightbulbIcon } from "lucide-react";

import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ArchiveAppMenubar } from "@/widgets/archive/archive-app-menubar/components/archive-app-menubar";
import { ArchiveAppMenubarActions } from "@/widgets/archive/archive-app-menubar/components/archive-app-menubar-actions";
import { ArchiveAppMenubarActionsButton } from "@/widgets/archive/archive-app-menubar/components/archive-app-menubar-actions-button";
import { ArchiveFilters } from "@/widgets/archive/archive-filters/components/archive-filters";
import { ArchiveItems } from "@/widgets/archive/archive-items/components/archive-items";
import { IdeasListDialog } from "@/widgets/ideas-list/ideas-list-dialog/components/ideas-list-dialog";
import { ScenarioSettings } from "@/widgets/scenarios/scenario-dialog/components/scenario-dialog";

export function ArchiveComponent() {
  return (
    <>
      <ArchiveAppMenubar
        filters={<ArchiveFilters />}
        actions={
          <ArchiveAppMenubarActions
            newIdeasListDialog={
              <IdeasListDialog
                trigger={
                  <ArchiveAppMenubarActionsButton icon={<LightbulbIcon />}>
                    Новые идеи
                  </ArchiveAppMenubarActionsButton>
                }
              />
            }
            newTemplateDialog={
              <ScenarioSettings
                trigger={
                  <ArchiveAppMenubarActionsButton icon={<FilmIcon />}>
                    Новый сценарий
                  </ArchiveAppMenubarActionsButton>
                }
              />
            }
          />
        }
      />
      <PageLayout>
        <ArchiveItems />
      </PageLayout>
    </>
  );
}
