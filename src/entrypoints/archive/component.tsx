import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ArchiveAppMenubar } from "@/widgets/archive/archive-app-menubar/components/archive-app-menubar";
import { ArchiveFilters } from "@/widgets/archive/archive-filters/components/archive-filters";
import { ArchiveItems } from "@/widgets/archive/archive-items/components/archive-items";
export function ArchiveComponent() {
  return (
    <>
      <ArchiveAppMenubar filters={<ArchiveFilters />} />
      <PageLayout className="flex-1">
        <ArchiveItems />
      </PageLayout>
    </>
  );
}
