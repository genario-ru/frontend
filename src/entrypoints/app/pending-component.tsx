import { MainLayout } from "@/shared/components/layouts/main-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";

export const AppPendingComponent = () => {
  return (
    <PageLayout>
      <MainLayout>
        <img
          src="/logo-512.png"
          alt="Animated logo"
          className="animate-flash-scale repeat-infinite m-auto h-24 w-24 object-cover duration-100"
        />
      </MainLayout>
    </PageLayout>
  );
};
