import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { ArchiveAppMenubar } from "@/widgets/archive/archive-app-menubar/components/archive-app-menubar";
import { ArchiveFilters } from "@/widgets/archive/archive-filters/components/archive-filters";
import { ArchiveFiltersCarousel } from "@/widgets/archive/archive-filters/components/archive-filters-carousel";
import { ArchiveItems } from "@/widgets/archive/archive-items/components/archive-items";
import { ArchiveSearch } from "@/widgets/archive/archive-search/components/archive-search";
import { AppDrawer } from "@/widgets/navigation/app-drawer/components/app-drawer";

export function ArchiveComponent() {
  const { isMobile } = useBreakpoints();
  const actions = isMobile && <AppDrawer />;
  const filters = isMobile ? <ArchiveFiltersCarousel /> : <ArchiveFilters />;

  return (
    <>
      <ArchiveAppMenubar
        actions={actions}
        search={<ArchiveSearch />}
        filters={filters}
        wrapCenter={isMobile}
      />
      <PageLayout className="flex-1 pb-2">
        <ArchiveItems />
      </PageLayout>
      <CommonFooter className="mt-auto" />
    </>
  );
}
