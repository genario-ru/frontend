import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { ArchiveAppMenubar } from "@/widgets/archive/archive-app-menubar/components/archive-app-menubar";
import { ArchiveFilters } from "@/widgets/archive/archive-filters/components/archive-filters";
import { ArchiveItems } from "@/widgets/archive/archive-items/components/archive-items";
import { ArchiveSearch } from "@/widgets/archive/archive-search/components/archive-search";

export function ArchiveComponent() {
  return (
    <>
      <ArchiveAppMenubar
        search={<ArchiveSearch />}
        filters={<ArchiveFilters />}
      />
      <PageLayout className="flex-1 pb-2">
        <ArchiveItems />
      </PageLayout>
      <CommonFooter className="mt-auto" />
    </>
  );
}
