import { RotateCwIcon } from "lucide-react";

import { CreditsPackageCard } from "@/features/credits/credits-package-card/components/credits-package-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useCreditsPackagesList } from "../hooks/use-credits-packages-list";

type CreditsPackagesListProps = {
  redirect?: string;
};

export function CreditsPackagesList({
  redirect = "/billing/credits",
}: CreditsPackagesListProps) {
  const {
    creditsPackageViews,
    isCreditsPackagesLoading,
    isCreditsPackagesError,
  } = useCreditsPackagesList();

  if (isCreditsPackagesLoading) {
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
        <CreditsPackageCard
          key={view.id}
          title={view.title}
          priceLabel={view.priceLabel}
          description={view.description}
          isPreferred={view.isPreferred}
          buttonLinkProps={{
            to: "/payment-redirect",
            search: {
              redirect,
              creditsPackageSlug: view.slug,
            },
            children: view.purchaseButtonLabel,
          }}
          metricBadges={view.metricBadgeLabels.map((label) => (
            <Badge
              key={label}
              color="neutral"
              variant={view.isPreferred ? "tertiary" : "secondary"}
              size="sm"
            >
              {label}
            </Badge>
          ))}
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
