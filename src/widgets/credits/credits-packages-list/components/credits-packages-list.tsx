import { RotateCwIcon } from "lucide-react";

import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useCreditsPackagesList } from "../hooks/use-credits-packages-list";
import { CreditsPackagesListItem } from "./credits-packages-list-item";

type CreditsPackagesListProps = {
  redirect?: string;
};

export function CreditsPackagesList({
  redirect = "/billing/credits",
}: CreditsPackagesListProps) {
  const {
    isMobile,
    paymentMethods,
    creditsPackageViews,
    isCreditsPackagesLoading,
    isMyPaymentMethodsLoading,
    isCreditsPackagesError,
  } = useCreditsPackagesList();

  if (isCreditsPackagesLoading || isMyPaymentMethodsLoading) {
    return <CreditsPackagesListSkeleton />;
  }

  if (isCreditsPackagesError) {
    return <CreditsPackagesListError />;
  }

  if (!creditsPackageViews.length) {
    return <CreditsPackagesListEmpty />;
  }

  return (
    <>
      {creditsPackageViews.map((view) => (
        <CreditsPackagesListItem
          key={view.id}
          view={view}
          paymentMethods={paymentMethods}
          isMobile={isMobile}
          redirect={redirect}
        />
      ))}
    </>
  );
}

export function CreditsPackagesListSkeleton() {
  return (
    <ItemsList
      noParent
      count={3}
      item={<Skeleton className="min-h-[200px] w-full rounded-2xl" />}
    />
  );
}

export function CreditsPackagesListError() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      variant="negative"
      title="Не удалось загрузить пакеты"
      description="Произошла ошибка при загрузке данных"
      actions={
        <Button icon={<RotateCwIcon />} onClick={reloadPage} className="mt-2">
          Обновить
        </Button>
      }
      className="m-auto"
    />
  );
}

export function CreditsPackagesListEmpty() {
  return (
    <Plug
      variant="neutral"
      title="Нет доступных пакетов"
      description="Здесь появятся доступные пакеты для покупки"
      className="m-auto py-8"
    />
  );
}
