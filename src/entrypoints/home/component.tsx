import { LightbulbIcon } from "lucide-react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { HomeAppMenubar } from "@/widgets/home/home-app-menubar/components/home-app-menubar";
import { HomeAppMenubarActions } from "@/widgets/home/home-app-menubar/components/home-app-menubar-actions";
import { HomeAppMenubarActionsButton } from "@/widgets/home/home-app-menubar/components/home-app-menubar-actions-button";
import { HomeTemplatesCarousel } from "@/widgets/home/home-templates-carousel/components/home-templates-carousel";
import { IdeasListDialog } from "@/widgets/ideas-lists/ideas-list-dialog/components/ideas-list-dialog";

export function HomeComponent() {
  return (
    <>
      <HomeAppMenubar
        actions={
          <HomeAppMenubarActions
            newIdeasListDialog={
              <IdeasListDialog
                trigger={
                  <HomeAppMenubarActionsButton icon={<LightbulbIcon />}>
                    Новые идеи
                  </HomeAppMenubarActionsButton>
                }
              />
            }
            newTemplateDialog={null}
          />
        }
      />
      <PageLayout>
        <ContentLayout>
          <HomeTemplatesCarousel />
        </ContentLayout>
      </PageLayout>
    </>
  );
}
