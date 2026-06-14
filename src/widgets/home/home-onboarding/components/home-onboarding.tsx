import { EyeOffIcon, RotateCwIcon } from "lucide-react";
import { type ReactNode, useMemo } from "react";

import {
  HomeOnboardingItem,
  HomeOnboardingItemSkeleton,
} from "@/features/home/home-onboarding/components/home-onboarding-item";
import { HomeOnboardingItemButtonLink } from "@/features/home/home-onboarding/components/home-onboarding-item-button-link";
import { ItemsList } from "@/shared/components/common/items-list";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

import { useHomeOnboarding } from "../hooks/use-home-onboarding";

export function HomeOnboarding() {
  const {
    onboardingData,
    isOnboardingLoading,
    isOnboardingError,
    isHideOnboardingPending,
    handleHideOnboarding,
  } = useHomeOnboarding();

  const body = useMemo(() => {
    if (isOnboardingLoading) {
      return <HomeOnboardingSkeleton />;
    }

    if (isOnboardingError || !onboardingData) {
      return <HomeOnboardingErrorPlug />;
    }

    return (
      <div className="flex flex-col gap-2">
        {onboardingData.items.map((item, index) => {
          let action: ReactNode | undefined;

          if (item.type === "profile" && item.status === "pending") {
            action = (
              <HomeOnboardingItemButtonLink to="/profiles/import">
                К созданию профиля
              </HomeOnboardingItemButtonLink>
            );
          }

          if (item.type === "ideas-list" && item.status === "pending") {
            action = (
              <HomeOnboardingItemButtonLink to="/ideas-lists/settings">
                К генерации идей
              </HomeOnboardingItemButtonLink>
            );
          }

          if (item.type === "scenario" && item.status === "pending") {
            action = (
              <HomeOnboardingItemButtonLink to="/ideas-lists/settings">
                К созданию сценария
              </HomeOnboardingItemButtonLink>
            );
          }

          return (
            <HomeOnboardingItem
              key={`home-onboarding-item-${index}`}
              position={index + 1}
              status={item.status}
              title={item.title}
              description={item.description}
              action={action}
            />
          );
        })}
      </div>
    );
  }, [isOnboardingError, isOnboardingLoading, onboardingData]);

  const actions = useMemo(() => {
    return (
      <Button
        size="sm"
        icon={<EyeOffIcon />}
        disabled={isHideOnboardingPending}
        onClick={handleHideOnboarding}
      >
        Скрыть
      </Button>
    );
  }, [handleHideOnboarding, isHideOnboardingPending]);

  return (
    <Island title="Быстрый старт" actions={actions} className="gap-3">
      {body}
    </Island>
  );
}

function HomeOnboardingSkeleton() {
  return <ItemsList count={4} gap={8} item={<HomeOnboardingItemSkeleton />} />;
}

function HomeOnboardingErrorPlug() {
  const reloadPage = useReloadPage();

  return (
    <Plug
      variant="negative"
      title="Ошибка загрузки"
      description="Произошла ошибка при загрузке онбординга. Попробуйте обновить страницу"
      actions={
        <Button icon={<RotateCwIcon />} size="sm" onClick={reloadPage}>
          Обновить
        </Button>
      }
      className="m-auto"
    />
  );
}
